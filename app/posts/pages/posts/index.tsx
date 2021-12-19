import { Suspense } from 'react';
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getPosts from 'app/posts/queries/getPosts';
import PostCard from 'app/posts/components/PostCard';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';

const ITEMS_PER_PAGE = 10;

export const PostsList = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const page = Number(router.query.page) || 0;
  const [{ posts, hasMore }] = usePaginatedQuery(getPosts, {
    orderBy: { id: 'asc' },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    where: {},
  });

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } });
  const goToNextPage = () => router.push({ query: { page: page + 1 } });

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {user?.role === 'ADMIN' && (
          <Link href={Routes.NewPostPage()}>
            <button className="p-2 rounded-md shadow-md bg-horz-green">Create New Post</button>
          </Link>
        )}
        <button
          className="p-2 rounded-md shadow-md bg-horz-green"
          disabled={page === 0}
          onClick={goToPreviousPage}
        >
          Previous
        </button>
        <button
          className="p-2 rounded-md shadow-md bg-horz-green"
          disabled={!hasMore}
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};

const PostsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <PostsList />
        </Suspense>
      </div>
    </>
  );
};

PostsPage.authenticate = true;
PostsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default PostsPage;
