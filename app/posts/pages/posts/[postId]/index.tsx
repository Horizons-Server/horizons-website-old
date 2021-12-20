import { Suspense, useEffect } from 'react';
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getPost from 'app/posts/queries/getPost';
import deletePost from 'app/posts/mutations/deletePost';
import ReactMarkdown from 'react-markdown';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';
import PostBody from 'app/posts/components/PostBody';

export const Post = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const postId = useParam('postId', 'number');
  const [deletePostMutation] = useMutation(deletePost);
  const [post] = useQuery(getPost, { id: postId });

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <div>
        <PostBody author={post.user.name} title={post.title} body={post.content} float="center" />

        {user?.role === 'ADMIN' && (
          <>
            <Link href={Routes.EditPostPage({ postId: post.id })}>
              <a className="p-2 rounded-md shadow-md bg-horz-green">Edit</a>
            </Link>
            <button
              className="p-2 ml-1 rounded-md shadow-md bg-horz-green"
              type="button"
              onClick={async () => {
                if (window.confirm('This will be deleted')) {
                  await deletePostMutation({ id: post.id });
                  router.push(Routes.PostsPage());
                }
              }}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </>
  );
};

const ShowPostPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Post />
      </Suspense>
    </div>
  );
};

ShowPostPage.authenticate = true;
ShowPostPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowPostPage;
