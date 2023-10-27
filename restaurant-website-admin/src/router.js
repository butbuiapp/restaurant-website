import { createBrowserRouter } from "react-router-dom";
import ManageOrderPage from "./pages/ManageOrderPage";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import ManageDishPage from "./pages/ManageDishPage";
import ManageReservationPage from "./pages/ManageReservationPage";
import Error from './components/layout/Error';
import AddDish from "./pages/AddDish";
import OrderDetailPage from './pages/OrderDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error/>,
    children: [
      {
        path: "",
        element: <ManageReservationPage />
      },
      {
        path: "order",
        element: <ManageOrderPage />
      },
      {
        path: "order/detail",
        element: <OrderDetailPage />
      },
      {
        path: "dish",
        element: <ManageDishPage />
      },
      {
        path: "reservation",
        element: <ManageReservationPage />
      },
      {
        path: "dish/add",
        element: <AddDish />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage/>,
  }
]);

export default router;