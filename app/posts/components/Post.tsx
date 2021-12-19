import ReactMarkdown from 'react-markdown';

interface Props {
  title: string;
  image?: string;
  body: string;
  author: string;
  float: 'center' | 'left' | 'right';
}

const PostBody = ({ image, body, title, author, float }: Props) => {
  return (
    <div
      className={`flex flex-col ${
        float === 'center' ? 'items-center' : float === 'right' ? 'items-end' : 'items-start'
      }`}
    >
      <div className="prose dark:prose-invert">
        {/** put your image stuff here */}
        <div>
          <h1>{title}</h1>
          <h3>By {author}</h3>
        </div>
        <ReactMarkdown>{`${body}`}</ReactMarkdown>
      </div>
    </div>
  );
};

export default PostBody;
