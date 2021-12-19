import { Form, FormProps } from 'app/core/components/Form';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { useCallback } from 'react';
import { useFormState } from 'react-final-form';
import { z } from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      {props.children}
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="image" label="Image" placeholder="Image Url" />
      <LabeledTextField name="content" label="Content" placeholder="Content" type="bigtext" />
    </Form>
  );
}
