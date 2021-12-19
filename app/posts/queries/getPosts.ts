import { paginate, resolver } from 'blitz';
import db, { Prisma } from 'db';

interface GetPostsInput
  extends Pick<Prisma.PostFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(['VERIFIED', 'ADMIN']),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPostsInput, ctx) => {
    const {
      items: posts,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.post.count({ where }),
      query: (paginateArgs) =>
        db.post.findMany({
          ...paginateArgs,
          where,
          orderBy,
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            image: true,
            title: true,
            user: true,
          },
        }),
    });

    return {
      posts,
      nextPage,
      hasMore,
      count,
    };
  },
);
