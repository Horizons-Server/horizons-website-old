import { resolver } from 'blitz';
import db, { Role } from 'db';
import { z } from 'zod';

const CreatePermission = z.object({
  name: z.string(),
  role: z.nativeEnum(Role),
});

export default resolver.pipe(
  resolver.zod(CreatePermission),
  resolver.authorize('ADMIN'),
  async (input) => {
    const permission = await db.permission.create({ data: input });

    return permission;
  },
);
