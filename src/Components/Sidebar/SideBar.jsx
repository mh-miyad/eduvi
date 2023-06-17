import { useContext, useEffect, useState } from "react";
import { Avatar, Sidebar } from "flowbite-react";
import { BsPersonVideo } from "react-icons/bs";
import {
  AiOutlineAppstoreAdd,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { FcPieChart, FcHome } from "react-icons/fc";
import { SiCoursera } from "react-icons/si";
import { LuListVideo } from "react-icons/lu";
import { MdManageAccounts } from "react-icons/md";
import "./sidebar.css"; // Import your CSS file here
import { Link } from "react-router-dom";

import { AuthContext } from "../../Auth/AuthProvider";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAdmin, setAdmin] = useState(null);
  const [isInstructor, setInstructor] = useState(null);
  const [isStudent, setStudent] = useState(null);
  const { user, label } = useContext(AuthContext);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    fetch(`http://localhost:5000/users/admin/${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.role === "admin") {
          setAdmin(true);
        } else if (data.role === "instructor") {
          setInstructor(true);
        } else {
          setStudent(false);
        }
      });
  }, []);
  return (
    <div>
      <div>
        <button
          onClick={toggleSidebar}
          className={`sidebar-toggle-button ${
            isSidebarOpen ? "open" : "closed"
          }`}>
          {isSidebarOpen ? (
            <AiOutlineClose className='border w-10 h-8 text-red-700' />
          ) : (
            <AiOutlineMenu className='border w-10 h-8 text-indigo-700' />
          )}
        </button>
        <div className={`sidebar ${isSidebarOpen ? "" : "hidden1"} `}>
          <Sidebar
            aria-label='Default sidebar example'
            className={`sidebar ${isSidebarOpen ? "" : "hidden"} `}>
            <Sidebar.Items>
              <div>
                <Avatar
                  img={user?.photoURL}
                  size={"xl"}
                  className=''
                  bordered
                  rounded
                  status='online'
                  color={"purple"}
                />
                <div className='text-center text-md font-bold text-gray-500 md:text-2xl my-5'>
                  {" "}
                  Name: {user?.displayName}
                </div>
                <div className='text-center text-md font-bold text-gray-500 md:text-2xl my-5'>
                  {isAdmin ? "Admin" : isInstructor ? "Instructor" : "Student "}
                </div>
              </div>
              <Sidebar.ItemGroup>
                {isAdmin && (
                  <>
                    <Sidebar.Item icon={FcPieChart}>
                      <Link to={"/dashboard"}>Dashboard</Link>
                    </Sidebar.Item>

                    <Sidebar.Item icon={LuListVideo}>
                      <Link to={"/dashboard/adminmanageclasses"}>
                        Manage Class{" "}
                      </Link>
                    </Sidebar.Item>

                    <Sidebar.Item icon={MdManageAccounts}>
                      <Link to={"/dashboard/manageusers"}>Manage Users</Link>
                    </Sidebar.Item>
                    <Sidebar.Item icon={FcHome}>
                      <Link to={"/"}>Go To Home</Link>
                    </Sidebar.Item>
                  </>
                )}
                {isInstructor && (
                  <>
                    <Sidebar.Item icon={LuListVideo}>
                      <Link to={"/dashboard/manageclasses"}>Manage Class </Link>
                    </Sidebar.Item>
                    <Sidebar.Item icon={AiOutlineAppstoreAdd}>
                      <Link to={"/dashboard/addclass"}>Add Classes </Link>
                    </Sidebar.Item>

                    <Sidebar.Item icon={FcHome}>
                      <Link to={"/"}>Go To Home</Link>
                    </Sidebar.Item>
                  </>
                )}
                {!isAdmin && !isInstructor && (
                  <>
                    <Sidebar.Item label={`${label}`} icon={SiCoursera}>
                      <Link to={"/dashboard/selectedcourse"}>
                        My Selected Courses
                      </Link>
                    </Sidebar.Item>
                    <Sidebar.Item icon={BsPersonVideo} labelColor='dark'>
                      <Link to={"/dashboard/enrollment"}>
                        My Enroll Classes
                      </Link>
                    </Sidebar.Item>
                    <Sidebar.Item icon={FcHome}>
                      <Link to={"/"}>Go To Home</Link>
                    </Sidebar.Item>
                  </>
                )}
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
