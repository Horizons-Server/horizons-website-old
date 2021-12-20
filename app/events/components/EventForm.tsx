import { Form, FormProps } from 'app/core/components/Form';
import LabeledBigText from 'app/core/components/LabeledBigText';
import { LabeledCalendarField } from 'app/core/components/LabeledCalendarField';
import { LabeledSelectField } from 'app/core/components/LabeledSelectField';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import getPosts from 'app/posts/queries/getPosts';
import getUsers from 'app/users/queries/getUsers';
import { useQuery } from 'blitz';
import { Field } from 'react-final-form';
import { z } from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';

export function EventForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [users] = useQuery(getUsers, { where: { OR: [{ role: 'VERIFIED' }, { role: 'ADMIN' }] } });
  const [posts] = useQuery(getPosts, {});

  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledBigText name="description" label="Description" placeholder="Description" />
      {/* <LabeledSelectField
        name="userId"
        label="Organizer"
        options={users.users.map((e) => ({ value: e.id, label: e.name }))}
      />
      <LabeledSelectField
        name="postId"
        label="Associated Post"
        options={posts.posts.map((e) => ({ value: e.id, label: e.title }))}
      /> */}
      {/** TODO make this work */}
      <Field name="userId" component="select">
        <option value={1}>Dog</option>
      </Field>

      <LabeledCalendarField name="date" label="Date" />
    </Form>
  );
}
