import { User } from 'db';
import { Image, Link, Routes } from 'blitz';
import moment from 'moment';

interface Props {
  post: {
    user: User;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    image: string | null;
    title: string;
  };
}

const PostCard = ({ post }: Props) => {
  return (
    <Link href={Routes.ShowPostPage({ postId: post.id })}>
      <div className="p-2 rounded-md shadow-md dark:bg-gray-700">
        <strong>{post.title}</strong>
        {post.image && (
          <Image height={200} width={200} alt="heading photo of post" src={post.image} />
        )}
        <div className="flex">
          <small className="flex-grow">By: {post.user.name}</small>
          <small className="">At: {moment(post.createdAt).format('MMM Do YY')}</small>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
