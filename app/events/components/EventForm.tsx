import { Form, FormProps } from 'app/core/components/Form';
import LabeledBigText from 'app/core/components/LabeledBigText';
import { LabeledCalendarField } from 'app/core/components/LabeledCalendarField';
import { LabeledSelectField } from 'app/core/components/LabeledSelectField';
import { LabeledTextField } from 'app/core/components/LabeledTextField';
import getPosts from 'app/posts/queries/getPosts';
import getUsers from 'app/users/queries/getUsers';
import { useQuery } from 'blitz';
import { z } from 'zod';
export { FORM_ERROR } from 'app/core/components/Form';

export function EventForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [users] = useQuery(getUsers, { where: { OR: [{ role: 'VERIFIED' }, { role: 'ADMIN' }] } });
  const [posts] = useQuery(getPosts, {});

  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="Title" placeholder="Title" />
      <LabeledBigText name="description" label="Description" placeholder="Description" />
      <LabeledSelectField
        type="number"
        name="userId"
        label="Organizer"
        options={users.users.map((e) => ({ value: e.id, label: e.name }))}
      />
      <LabeledSelectField
        type="number"
        name="postId"
        label="Associated Post"
        options={posts.posts.map((e) => ({ value: e.id, label: e.title }))}
      />
      <div>
        <b className="text-2xl">All Times in GMT</b>
        <div className="flex gap-1">
          <LabeledTextField name="hours" label="Hours (24hr time)" placeholder="13" type="number" />
          <LabeledTextField name="minutes" label="Minutes" placeholder="13" type="number" />
        </div>
        {/** TODO make this work */}
        {/* <Field name="userId" component="select">
          <option value="1">Dog</option>
        </Field> */}
        <LabeledCalendarField name="day" label="Date" />
      </div>
    </Form>
  );
}
