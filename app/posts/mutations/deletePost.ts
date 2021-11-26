import { resolver } from 'blitz';
import db from 'db';
import { z } from 'zod';

const DeletePost = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeletePost),
  resolver.authorize('ADMIN'),
  async ({ id }) => {
    const post = await db.post.deleteMany({ where: { id } });

    return post;
  },
);
