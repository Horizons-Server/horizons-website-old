import Layout from 'app/core/layouts/Layout';
import { BlitzPage } from 'next';

const NotAuthorized: BlitzPage = () => {
  return <h1>No Acess</h1>;
};

NotAuthorized.suppressFirstRenderFlicker = true;
NotAuthorized.getLayout = (page) => <Layout title="Not authorized">{page}</Layout>;

export default NotAuthorized;
