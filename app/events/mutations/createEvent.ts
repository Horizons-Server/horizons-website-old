import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';
import { CreateEvent } from '../validation';

export default resolver.pipe(
  resolver.zod(CreateEvent),
  resolver.authorize('ADMIN'),
  async (input) => {
    const event = await db.event.create({ data: input });

    return event;
  },
);
