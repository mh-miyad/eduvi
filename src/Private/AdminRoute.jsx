// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Auth/AuthProvider";
// import { Navigate } from "react-router-dom";

// const AdminRoute = ({ children, roles }) => {
//   const { user } = useContext(AuthContext);
//   const [isAdmin, setAdmin] = useState(false);

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/users/admin/${user?.email}`,
//         );
//         const data = await response.json();

//         if (data.role === "admin") {
//           setAdmin(true);
//         }
//       } catch (error) {
//         console.error("Error fetching user role:", error);
//         // Handle error fetching user role
//       }
//     };

//     fetchUserRole();
//   }, []);

//   const isAuthenticated = user !== null;
//   const hasRequiredRole = isAdmin && roles.includes("admin");

//   if (isAuthenticated && hasRequiredRole) {
//     return children;
//   } else if (isAuthenticated && !hasRequiredRole) {
//     // User is authenticated but doesn't have the required role
//     return <Navigate to='/dashboard/manageusers' />;
//   } else {
//     // User is not authenticated, redirect to login page
//     return <Navigate to='/login' />;
//   }
// };

// export default AdminRoute;
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "flowbite-react";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, setAdmin] = useState(null);
  const location = useLocation();
  const fetchUserRole = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/users/admin/${user?.email}`,
      );
      const data = await response.json();

      if (data.role === "admin") {
        setAdmin(true);
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      // Handle error fetching user role
    }
  };

  fetchUserRole();

  if (isAdmin) {
    return children;
  }

  if (loading) {
    return <Spinner className='text-center' size={"xl"} color={"purple"} />;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
