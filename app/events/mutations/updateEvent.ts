import { resolver } from 'blitz';
import db from 'db';
import { UpdateEvent } from '../validation';

export default resolver.pipe(
  resolver.zod(UpdateEvent),
  resolver.authorize('ADMIN'),
  async ({ id, ...data }) => {
    const event = await db.event.update({ where: { id }, data });

    return event;
  },
);
