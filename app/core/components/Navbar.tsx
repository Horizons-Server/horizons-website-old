import { Link, Routes, Image } from 'blitz';
import Logo from 'public/HorizonsLogo.svg';

const Navbar = () => {
  return (
    <div className="fixed z-50 flex w-full h-12 mt-0 text-white bg-horz-blue">
      {/* <Image alt="logo" src={Logo} layout="fill" className="" /> */}
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
