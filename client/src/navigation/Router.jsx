import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
  
import Main from "../pages";
import Error from "../pages/404"

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement : <Error />
    },
  ]);

  export default () => <RouterProvider router={router} />