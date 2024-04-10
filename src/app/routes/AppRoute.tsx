import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hotel } from "app/modules/hotel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hotel />,
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
