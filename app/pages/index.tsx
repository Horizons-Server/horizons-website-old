import { Suspense } from 'react';
import { Image, Link, BlitzPage, useMutation, Routes } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { useCurrentUser } from 'app/core/hooks/useCurrentUser';
import logout from 'app/auth/mutations/logout';
import Logo from 'public/HorizonsLogo.svg';

const UserInfo = () => {
  const currentUser = useCurrentUser();
  const [logoutMutation] = useMutation(logout);

  if (currentUser) {
    return (
      <>
        <button
          className="p-2 bg-purple-400 rounded-sm"
          onClick={async () => {
            await logoutMutation();
          }}
        >
          Logout
        </button>
        <div>
          Discord Username: <code>{currentUser.name}</code>
          <br />
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    );
  } else {
    return (
      <>
        <a className="p-2 bg-purple-400 rounded-sm" href={'/api/auth/discord'}>
          <strong>Sign Up With Discord</strong>
        </a>
      </>
    );
  }
};

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>
        <div className="logo">
          <Image height={100} src={Logo} alt="Logo" />
        </div>
        <p>
          <strong>Congrats!</strong> Your app is ready, including user sign-up and log-in.
        </p>
        <div className="">
          <Suspense fallback="Loading...">
            <UserInfo />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

Home.suppressFirstRenderFlicker = true;
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>;

export default Home;
