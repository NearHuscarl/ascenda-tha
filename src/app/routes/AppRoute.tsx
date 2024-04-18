import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Hotel } from "app/modules/hotel";
import { HotelDetail } from "app/modules/hotel-detail";
import { getHotels } from "app/modules/hotel/api/hotels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hotel />,
  },
  {
    path: "/hotels/:id",
    element: <HotelDetail />,
    loader: async ({ params }) => {
      // loaders can be async functions
      const hotels = await getHotels("USD");
      return hotels.find((h) => h.id === Number(params.id));
    },
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;
