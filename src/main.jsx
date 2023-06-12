import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import router from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./Auth/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { Flowbite } from "flowbite-react";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Flowbite>
          <div className=' max-w-7xl container mx-auto '>
            <RouterProvider router={router} />
          </div>
        </Flowbite>
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
);
