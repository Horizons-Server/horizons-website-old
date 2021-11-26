import { resolver } from 'blitz';
import db from 'db';
import { UpdatePost } from '../validations';

export default resolver.pipe(
  resolver.zod(UpdatePost),
  resolver.authorize('ADMIN'),
  async ({ id, ...data }, ctx) => {
    const post = await db.post.update({
      where: { id },
      data: { ...data, userId: ctx.session.userId },
    });

    return post;
  },
);
