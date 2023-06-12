import React from "react";
import { Outlet } from "react-router-dom";
import NavbarCom from "./Components/Navbar/NavbarCom";
import FooterComp from "./Components/Footer/FooterComp";

const App = () => {
  return (
    <>
      <div className='container mx-auto'>
        <NavbarCom />
        <Outlet />
        <FooterComp />
      </div>
    </>
  );
};

export default App;
