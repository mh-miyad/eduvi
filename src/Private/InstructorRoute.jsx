import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, setInstructor] = useState(null);
  const location = useLocation();

  const fetchUserRole = async () => {
    try {
      const response = await fetch(
        `https://eduvi-server.vercel.app/users/admin/${user?.email}`,
      );
      const data = await response.json();

      if (data.role === "instructor") {
        setInstructor(true);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      // Handle error fetching user role
    }
  };

  fetchUserRole();

  if (isInstructor) {
    return children;
  }

  if (loading) {
    return <Spinner className='text-center' size={"xl"} color={"purple"} />;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
