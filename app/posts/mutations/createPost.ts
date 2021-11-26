import { resolver } from 'blitz';
import db from 'db';
import { CreatePost } from 'app/posts/validations';

export default resolver.pipe(
  resolver.zod(CreatePost),
  resolver.authorize('ADMIN'),
  async (input, ctx) => {
    const post = await db.post.create({ data: { ...input, userId: ctx.session.userId } });

    return post;
  },
);
