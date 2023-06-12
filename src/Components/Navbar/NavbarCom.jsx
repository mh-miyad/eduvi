import React from "react";
import {
  Navbar,
  Avatar,
  Dropdown,
  Button,
  DarkThemeToggle,
} from "flowbite-react";
import logo from "../../assets/Homepage/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { toast } from "react-toastify";
import "./navbar.css";

const NavbarCom = () => {
  const { user, logOut } = useContext(AuthContext);

  const signOutBtn = () => {
    logOut()
      .then(() => {
        toast(" Sign-out successful.");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  return (
    <>
      <Navbar fluid rounded id='nav'>
        <Navbar.Brand>
          <img alt='Eduvi React Logo' className='mr-3 h-6 sm:h-9' src={logo} />
          <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
            Eduvi
          </span>
        </Navbar.Brand>
        <div className='flex md:order-2'>
          {user ? (
            <Dropdown
              inline
              label={
                <Avatar alt='User settings' img={user?.photoURL} rounded />
              }>
              <Dropdown.Header>
                <span className='block text-sm'>{user?.displayName}</span>
                <span className='block truncate text-sm font-medium'>
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to='/dashboard'>Dashboard</Link>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item onClick={signOutBtn}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to='/login'>
              {" "}
              <Button color={"blue"}> Log in </Button>
            </Link>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link>
            <NavLink to={"/"}> Home </NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <NavLink to={"/instructors"}> Instructor</NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <NavLink to={"/classes"}> Classes</NavLink>
          </Navbar.Link>
          <Navbar.Link>
            <DarkThemeToggle />
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavbarCom;
