import React from "react";

import { Outlet, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store";
// import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./routes/router";
function App() {
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          {/* <Toaster position="top-right" richColors /> */}
          
          <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;