import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';
import { CreateEvent } from '../validation';

export default resolver.pipe(resolver.zod(CreateEvent), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const event = await db.event.create({ data: input });

  return event;
});
