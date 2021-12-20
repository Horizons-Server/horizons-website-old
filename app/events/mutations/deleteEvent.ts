import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const DeleteEvent = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteEvent),
  resolver.authorize('ADMIN'),
  async ({ id }) => {
    const event = await db.event.deleteMany({ where: { id } });

    return event;
  },
);
