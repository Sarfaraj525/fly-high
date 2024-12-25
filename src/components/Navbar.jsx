import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gradient-to-r from-gray-600 via-gray-800 to-gray-900 text-white">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <a>About us</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
              <li>
                <a>Blogs</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold">Fly High</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>About us</a>
            </li>
            <li>
              <a>Contacts</a>
            </li>
            <li>
              <a>Blogs</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-gray-600 text-white hover:bg-gray-500 border-none">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
