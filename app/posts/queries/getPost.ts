import { serialize } from 'next-mdx-remote/serialize';
import { resolver, NotFoundError } from 'blitz';
import db from 'db';
import matter from 'gray-matter';
import { z } from 'zod';

const GetPost = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, 'Required'),
});

export default resolver.pipe(
  resolver.zod(GetPost),
  resolver.authorize(['VERIFIED', 'ADMIN']),
  async ({ id }) => {
    const post = await db.post.findFirst({ where: { id } });

    if (!post) throw new NotFoundError();

    const { content, data } = matter(post.content);

    const md = await serialize(content, {
      // Optionally pass remark/rehype plugins
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
      scope: data,
    });

    return { ...post, md };
  },
);
