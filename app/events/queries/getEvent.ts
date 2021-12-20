import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import { z } from 'zod';

const GetEvent = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
});

export default resolver.pipe(
  resolver.zod(GetEvent),
  resolver.authorize(['ADMIN', 'VERIFIED']),
  async ({ id }) => {
    const event = await db.event.findFirst({ where: { id } });

    if (!event) throw new NotFoundError();

    return event;
  },
);
