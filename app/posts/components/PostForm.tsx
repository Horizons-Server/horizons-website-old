import { Form, FormProps } from 'app/core/components/Form';
import LabeledBigText from 'app/core/components/LabeledBigText';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import { z } from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';

export function PostForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props} className="flex flex-col">
      {props.children}
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledTextField name="image" label="Image" placeholder="Image Url" />
      <LabeledBigText name="content" label="Content" placeholder="Content" />
    </Form>
  );
}
