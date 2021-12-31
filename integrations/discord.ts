import { GuildMember, Intents } from 'discord.js';
import { Client } from 'discordx';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES],
});

export const fetchRoles = async ({ userId }: { userId: string }) => {
  await client.login(process.env.BOT_TOKEN ?? '');

  const guild = client.guilds.cache.get(process.env.BOT_GUILD ?? '');

  if (!guild) return new Error('Discord Server verification down.');

  let guildUser: GuildMember;

  try {
    guildUser = await guild.members.fetch({
      force: true,
      user: userId,
      cache: true,
    });
  } catch {
    return new Error('You are not in the server.');
  }

  const roles = guildUser.roles.cache.map(({ name }) => name);
  client.destroy();

  return roles;
};
