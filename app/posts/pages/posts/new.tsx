import { Link, useRouter, useMutation, BlitzPage, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import createPost from 'app/posts/mutations/createPost';
import { PostForm, FORM_ERROR } from 'app/posts/components/PostForm';
import { CreatePost } from 'app/posts/validations';
import { useState } from 'react';
import { FormSpy } from 'react-final-form';
import PostBody from 'app/posts/components/PostBody';

const NewPostPage: BlitzPage = () => {
  const router = useRouter();
  const [createPostMutation] = useMutation(createPost);
  const [md, setMd] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  return (
    <div>
      <div className="grid h-full grid-cols-1 sm:grid-cols-2">
        <PostForm
          submitText="Create Post"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          schema={CreatePost}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const post = await createPostMutation(values);
              router.push(Routes.ShowPostPage({ postId: post.id }));
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
        <PostBody body={md} title={title} image={image} author={'John Doe'} float="left" />
      </div>
    </div>
  );
};

NewPostPage.authenticate = true;
NewPostPage.getLayout = (page) => <Layout title={'Create New Post'}>{page}</Layout>;

export default NewPostPage;
