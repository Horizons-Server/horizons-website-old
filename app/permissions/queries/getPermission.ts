import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetPermission = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
});

export default resolver.pipe(resolver.zod(GetPermission), resolver.authorize(), async ({ id }) => {
  const permission = await db.permission.findFirst({ where: { id } });

  if (!permission) throw new NotFoundError();

  return permission;
});
