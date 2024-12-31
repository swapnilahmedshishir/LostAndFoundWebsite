import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { AppContext } from "../Context/ContextProvider";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, logoutUser } = useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  // Log out the user
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error("Failed to log out. Please try again.");
      });
  };

  const navRouter = (
    <>
      <li>
        <Link to="/" className="hover:text-gray-900">
          Home
        </Link>
      </li>
      <li>
        <Link to="/allItems" className="hover:text-gray-100">
          Lost & Found Items
        </Link>
      </li>
    </>
  );

  const userInfo = (
    <>
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-900">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-900">
              Register
            </Link>
          </>
        ) : (
          <>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="cursor-pointer relative"
            >
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
                title={user?.displayName}
                referrerPolicy="no-referrer"
              />
              {/* Display Name Tooltip */}
              <div className="absolute top-10 left-[6.5rem] md:left-1/2 z-[100] transform -translate-x-1/2 px-2 py-1 text-sm rounded shadow-lg whitespace-nowrap display-name-tooltip hidden">
                {user?.displayName}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="font-extrabold text-left px-4 py-2 hover:bg-black hover:text-white rounded-xl"
            >
              Logout
            </button>
          </>
        )}

        {/* Dropdown */}
        {showDropdown && user && (
          <div className="absolute z-[100] right-[8.5rem] top-[4.7rem] mt-2 w-52 text-left py-2 px-4 bg-gray-400 text-white border rounded-lg shadow-lg">
            <ul className="whitespace-nowrap">
              <li>
                <Link to="/addItems" className="hover:text-gray-900">
                  Add Lost & Found Item
                </Link>
              </li>
              <li>
                <Link to="/allRecovered" className="hover:text-gray-900">
                  All Recovered Items
                </Link>
              </li>
              <li>
                <Link to="/myItems" className="hover:text-gray-900">
                  Manage My Items
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="navbar bg-base-100 pl-1 pr-2 md:pl-2 md:pr-10 dark:bg-gray-900">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {/* small device  */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[100] mt-3 w-52 p-2 shadow dark:bg-gray-500"
          >
            {navRouter}
          </ul>
        </div>
        <Link to="/" className="hidden md:block text-sm md:text-xl">
          <Typewriter
            words={["Welcome to ", "Lost and Found Application!"]}
            loop={true}
            cursor
          />
        </Link>
        <Link to="/" className="none md:hidden  text-sm md:text-xl">
          Lost and Found
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navRouter}</ul>
      </div>
      <div className="navbar-end">{userInfo}</div>
    </div>
  );
};

export default NavBar;
