import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
import Main from "../pages";
import Error from "../pages/404"
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Listing from "../pages/listing/";
import CreateListing from "../pages/listing/create";
import Screen from "../utils/Screens";

  const router = createBrowserRouter([
    {
      path:  Screen.HOME ,
      element: <Main />,
      errorElement : <Error />
    },
    {
      path:  Screen.LOGIN ,
      element: <Login />
    },
    {
      path:  Screen.REGISTER ,
      element: <Register />
    },
    {
      path:  Screen.VIEW,
      element: <Listing />
    },
    {
      path:  Screen.ADD_LISTING,
      element: <CreateListing />
    },
  ]);

  export default () => <RouterProvider router={router} />