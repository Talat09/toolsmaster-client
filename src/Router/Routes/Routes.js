import { createBrowserRouter } from "react-router-dom";
import Main from "../../layout/Main";
import Home from "../../components/Home/Home";
import Blogs from "../../components/Blogs/Blogs";
import Reviews from "../../components/Reviews/Reviews";
import Purchases from "../../components/Purchases/Purchases";
import Login from "../../components/Login/Login";
import SignUp from "../../components/Login/SignUp";
import BestSeller from "../../components/BestSeller/BestSeller";
import TopRated from "../../components/TopRated/TopRated";
import Dashboard from "../../components/Dashboard/Dashboard";
import AddReview from "../../components/Dashboard/AddReview/AddReview";
import MyOrders from "../../components/Dashboard/Orders/MyOrders";
import MyProfile from "../../components/Dashboard/MyProfile/MyProfile";
import UpdateProfile from "../../components/Dashboard/MyProfile/UpdateProfile";
import AllUsers from "../../components/Dashboard/AllUsers/AllUsers";
import AddProduct from "../../components/Dashboard/AddProduct/AddProduct";
import ManageProducts from "../../components/Dashboard/ManageProducts/ManageProducts";
import ManageAllOrders from "../../components/Dashboard/ManageAllOrders/ManageAllOrders";
import RequireAuth from "../../components/Login/RequireAuth";
import RequireAdmin from "../../components/Login/RequireAdmin";
import Payment from "../../components/Dashboard/Payment/Payment";
import AllPendingShippedUnpaidOrders from "../../components/Dashboard/AllPendingShippedUnpaidOrders/AllPendingShippedUnpaidOrders";
import MyPortfolio from "../../components/MyPortfolio/MyPortfolio";
import NotFound from "../../components/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        children: [
          {
            path: "/",
            element: <BestSeller />,
          },
          {
            path: "/top-rated",
            element: <TopRated />,
          },
        ],
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/portfolio",
        element: <MyPortfolio></MyPortfolio>,
      },
      {
        path: "/purchase/:id",
        element: (
          <RequireAuth>
            <Purchases />
          </RequireAuth>
        ),
      },
      {
        path: "/review",
        element: <Reviews></Reviews>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
        children: [
          {
            path: "/dashboard/add-review",
            element: <AddReview />,
          },
          {
            path: "/dashboard/payment/:id",
            element: <Payment />,
          },
          {
            path: "/dashboard/payment/:id",
            element: <Payment />,
          },
          {
            path: "/dashboard/pending-orders",
            element: (
              <RequireAdmin>
                <AllPendingShippedUnpaidOrders searchText="pending" />
              </RequireAdmin>
            ),
          },
          {
            path: "/dashboard/shipped-orders",
            element: (
              <RequireAdmin>
                <AllPendingShippedUnpaidOrders searchText="shipped" />
              </RequireAdmin>
            ),
          },
          {
            path: "/dashboard/unpaid-orders",
            element: (
              <RequireAdmin>
                <AllPendingShippedUnpaidOrders searchText="unpaid" />
              </RequireAdmin>
            ),
          },
          {
            path: "/dashboard/my-orders",
            element: <MyOrders />,
          },

          {
            path: "/dashboard",
            element: <MyProfile />,
          },
          {
            path: "user/update-profile",
            element: <UpdateProfile />,
          },
          {
            path: "all-users",
            element: (
              <RequireAdmin>
                <AllUsers />
              </RequireAdmin>
            ),
          },
          {
            path: "add-product",
            element: <AddProduct />,
          },
          {
            path: "manage-products",
            element: (
              <RequireAdmin>
                <ManageProducts />
              </RequireAdmin>
            ),
          },
          {
            path: "manage-orders",
            element: <ManageAllOrders />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound></NotFound>,
      },
    ],
  },
]);
