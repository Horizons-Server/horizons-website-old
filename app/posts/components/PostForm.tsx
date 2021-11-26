import { Form, FormProps } from 'app/core/components/Form';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { z } from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import { dynamic } from 'blitz';
import { useState } from 'react';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [markdown, setMarkdown] = useState<string | undefined>('');

  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="image" label="Image" placeholder="Image Url" />

      <MDEditor value={markdown} onChange={setMarkdown} />
      <LabeledTextField name="content" label="Content" placeholder="Markdown Content" />
    </Form>
  );
}
