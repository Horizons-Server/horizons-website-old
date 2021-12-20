import { paginate, resolver } from 'blitz';
import db, { Prisma } from 'db';

interface GetEventsInput
  extends Pick<Prisma.EventFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'> {}

export default resolver.pipe(
  resolver.authorize(['VERIFIED', 'ADMIN']),
  async ({ where, orderBy, skip = 0, take = 100 }: GetEventsInput) => {
    const {
      items: events,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.event.count({ where }),
      query: (paginateArgs) => db.event.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      events,
      nextPage,
      hasMore,
      count,
    };
  },
);
