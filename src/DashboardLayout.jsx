import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Components/Sidebar/SideBar";

const DashboardLayout = () => {
  return (
    <div className='flex gap-10 '>
      <SideBar />
      <div className='my-5 flex-1'>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
