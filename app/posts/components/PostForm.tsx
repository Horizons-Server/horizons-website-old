import { Form, FormProps } from 'app/core/components/Form';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { z } from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';
import { useState } from 'react';
import { Field } from 'react-final-form';

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [markdown, setMarkdown] = useState<string | undefined>('');

  return (
    <Form<S> {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="image" label="Image" placeholder="Image Url" />
      <LabeledTextField name="content" label="Content" placeholder="Content" />
    </Form>
  );
}
