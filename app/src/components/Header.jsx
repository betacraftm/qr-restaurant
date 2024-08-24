import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div>
      <header className="navbar shadow-md">
        <div className="navbar-start">
          <div className="cursor-pointer" onClick={() => navigate("/")}>
            <img
              src="horizontal-logo.png"
              alt="logo"
              className="h-10 object-contain"
            />
          </div>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="font-semibold">
              <a>About</a>
            </li>
            <li className="font-semibold">
              <a>How To Use</a>
            </li>
            <li className="font-semibold">
              <a>Features</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="btn hidden bg-red-500 text-white hover:bg-red-600 md:inline-flex">
            <Link to={"/sign-in"}>Sign In</Link>
          </div>
          <span
            className="rounded-md bg-red-500 p-2 text-2xl text-white md:hidden"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            {showMenu ? <IoCloseSharp /> : <GiHamburgerMenu />}
          </span>
        </div>
      </header>
      <div className={showMenu ? "block" : "hidden"}>
        <ul className="menu w-full rounded-none bg-base-200 p-0 shadow-md">
          <li
            className="rounded-none border-b border-slate-300"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <a>About</a>
          </li>
          <li
            className="rounded-none border-b border-slate-300"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <a>How To Use</a>
          </li>
          <li
            className="rounded-none border-b border-slate-300"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <a>Features</a>
          </li>
          <li onClick={() => setShowMenu((prev) => !prev)}>
            <Link to={"/sign-in"}>Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
