import { Link, useRouter, useMutation, BlitzPage, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import createEvent from 'app/events/mutations/createEvent';
import { EventForm, FORM_ERROR } from 'app/events/components/EventForm';
import { Suspense } from 'react';
import { CreateEvent } from 'app/events/validation';

const NewEvent = () => {
  const router = useRouter();
  const [createEventMutation] = useMutation(createEvent);

  return (
    <div>
      <h1>Create New Event</h1>

      <EventForm
        submitText="Create Event"
        // schema={CreateEvent}
        // initialValues={{}}
        onSubmit={async (values) => {
          console.log(values);
          try {
            const event = await createEventMutation(values);
            router.push(Routes.ShowEventPage({ eventId: event.id }));
          } catch (error: any) {
            console.error(error);
            return {
              [FORM_ERROR]: error.toString(),
            };
          }
        }}
      />

      <p>
        <Link href={Routes.EventsPage()}>
          <a>Events</a>
        </Link>
      </p>
    </div>
  );
};

const NewEventPage: BlitzPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewEvent />
    </Suspense>
  );
};

NewEventPage.authenticate = true;
NewEventPage.getLayout = (page) => <Layout title={'Create New Event'}>{page}</Layout>;

export default NewEventPage;
