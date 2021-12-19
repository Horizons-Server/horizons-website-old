import db, { Role } from 'db';
import { Client } from 'discordx';
import { Intents } from 'discord.js';
import { passportAuth } from 'next/stdlib-server';
import DiscordStrategy from 'passport-discord';
import { fetchRoles } from 'integrations/discord';

export default passportAuth({
  successRedirectUrl: '/',
  errorRedirectUrl: '/',
  strategies: [
    {
      strategy: new DiscordStrategy(
        // todo fix
        {
          clientID: process.env.DISCORD_CLIENT ?? '',
          clientSecret: process.env.DISCORD_SECRET ?? '',
          callbackURL:
            process.env.NODE_ENV === 'production'
              ? 'https://example.com/api/auth/discord/callback'
              : 'http://localhost:3000/api/auth/discord/callback',
          scope: ['identify'],
        },
        async function (_at, _rt, profile, done) {
          if (!profile.id) {
            return done(new Error("Discord OAuth Response doesn't have discord id."));
          }

          const discordRoles = await fetchRoles({ userId: profile.id });

          if (discordRoles instanceof Error) {
            return done(discordRoles);
          }

          const permissions = await db.permission.findMany({
            where: { name: { in: discordRoles } },
            select: { name: true, role: true },
          });

          const foundNames = permissions.map(({ name }) => name);

          const toCreate: string[] = [];

          for (const r of discordRoles) {
            if (!foundNames.includes(r)) toCreate.push(r);
          }

          await db.permission.createMany({
            data: toCreate.map((e) => ({
              name: e,
            })),
          });

          const newestPermission = await db.permission.findMany({
            where: { name: { in: discordRoles } },
            select: { role: true },
          });

          const roles = newestPermission.map(({ role }) => role);
          let finalRole: Role;

          console.log(roles);

          if (roles.includes('ADMIN')) finalRole = 'ADMIN';
          else if (roles.includes('VERIFIED')) finalRole = 'VERIFIED';
          else finalRole = 'NOT_VERIFIED';

          const user = await db.user.upsert({
            where: { discordId: profile.id },
            create: { name: profile.username, discordId: profile.id, role: finalRole },
            update: { name: profile.username, discordId: profile.id, role: finalRole },
          });

          done(undefined, { publicData: { userId: user.id, role: user.role } });
        },
      ),
    },
  ],
});
