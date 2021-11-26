import { Link, Routes } from 'blitz';

const Navbar = () => {
  return (
    <div className="z-50 flex h-12 mt-0 bg-horz-blue">
      <div className="flex p-2 hover:bg-horz-green">
        <Link href={Routes.PostsPage()}>
          <a className="m-auto text-xl font-display">
            <strong>Posts</strong>
          </a>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
