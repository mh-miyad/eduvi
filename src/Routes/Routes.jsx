import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import RegisterForm from "../pages/RegisterForm";
import InstructorDetails from "../pages/InstructorDetails";
import Instructor from "../pages/Instructor";
import Class from "../pages/Class";
import ClassDetails from "../pages/ClassDetails";
import DashboardLayout from "../DashboardLayout";
// import DashHome from "../Dashboard/DashHome";
import ManageUser from "../Dashboard/ManageUser";
import SelectCourse from "../Dashboard/Student/SelectCourse";
import Payment from "../Payment/Payment";
import EnrollClass from "../Dashboard/Student/EnrollClass";
import MnageClass from "../Dashboard/Instructor/MnageClass";
import AddClass from "../Dashboard/Instructor/AddClass";
import AdminRoute from "../Private/AdminRoute";
import AdminManageClass from "../Dashboard/AdminManageClass";
import InstructorRoute from "../Private/InstructorRoute";
import ErrorPage from "../Private/ErrorPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/classes",
        element: <Class />,
      },
      {
        path: "/class/:id",
        element: <ClassDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/courses/${params.id}`),
      },
      {
        path: "/instructors",
        element: <Instructor />,
      },
      {
        path: "/instructor/:id",
        element: <InstructorDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/instructor/${params.id}`),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <RegisterForm />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/payments",
        element: <Payment />,
      },

      {
        path: "/dashboard/manageusers",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/adminmanageclasses",
        element: (
          <AdminRoute>
            <AdminManageClass />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/selectedcourse",
        element: <SelectCourse />,
      },
      {
        path: "/dashboard/enrollment",
        element: <EnrollClass />,
      },
      {
        path: "/dashboard/manageclasses",
        element: (
          <InstructorRoute>
            {" "}
            <MnageClass />{" "}
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/addclass",
        element: (
          <InstructorRoute>
            <AddClass />{" "}
          </InstructorRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export default router;
