import { Suspense, useState } from 'react';
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import getPost from 'app/posts/queries/getPost';
import updatePost from 'app/posts/mutations/updatePost';
import { PostForm, FORM_ERROR } from 'app/posts/components/PostForm';
import { UpdatePost } from 'app/posts/validations';
import { FormSpy } from 'react-final-form';
import PostBody from 'app/posts/components/PostBody';

export const EditPost = () => {
  const router = useRouter();
  const postId = useParam('postId', 'number');
  const [post, { setQueryData }] = useQuery(
    getPost,
    { id: postId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    },
  );
  const [updatePostMutation] = useMutation(updatePost);
  const [md, setMd] = useState(post.content);
  const [title, setTitle] = useState(post.title);
  const [image, setImage] = useState(post.image);

  return (
    <>
      <Head>
        <title>Editing {title}</title>
      </Head>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <PostBody
            body={md}
            author={post.user.name}
            image={image ?? undefined}
            title={title}
            float="left"
          />
          <PostForm
            submitText="Update Post"
            // TODO use a zod schema for form validation
            schema={UpdatePost}
            initialValues={
              post as Partial<{
                image?: string | undefined;
                id: number;
                title: string;
                content: string;
              }>
            }
            onSubmit={async (values) => {
              try {
                const updated = await updatePostMutation({
                  ...values,
                  id: post.id,
                });
                await setQueryData(updated);
                router.push(Routes.ShowPostPage({ postId: updated.id }));
              } catch (error: any) {
                console.error(error);
                return {
                  [FORM_ERROR]: error.toString(),
                };
              }
            }}
          >
            <FormSpy
              onChange={(e) => {
                setMd(e.values['content']);
                setTitle(e.values['title']);
                setImage(e.values['image']);
              }}
            />
          </PostForm>
        </div>
      </div>
    </>
  );
};

const EditPostPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPost />
      </Suspense>
    </div>
  );
};

EditPostPage.authenticate = true;
EditPostPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditPostPage;
