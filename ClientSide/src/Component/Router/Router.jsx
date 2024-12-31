import App from "../../App";
import AddLostFoundItem from "../../Pages/AddLostFoundItem/AddLostFoundItem";
import AllLostAndFoundItems from "../../Pages/AllLostAndFoundItemsPage/AllLostAndFoundItems";
import AllRecoveredItems from "../../Pages/AllRecoveredItems/AllRecoveredItems";
import Home from "../../Pages/Home/Home";
import MyItems from "../../Pages/MyItems/MyItems";
import PostDetails from "../../Pages/PostDetailsPage/PostDetails";
import UpdateLostFoundItem from "../../Pages/UpdateLostFoundItem/UpdateLostFoundItem";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";
import Erro from "../ErroPage/Erro";
import PrivateRoute from "../ProtectedRoute/ProtectedRoute";

const RoutersItems = [
  {
    path: "/",
    element: <App></App>,
    errorElement: <Erro></Erro>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allItems",
        element: <AllLostAndFoundItems />,
      },
      {
        path: "/addItems",
        element: (
          <PrivateRoute>
            <AddLostFoundItem />
          </PrivateRoute>
        ),
      },
      {
        path: "/myItems",
        element: (
          <PrivateRoute>
            <MyItems />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateItems/:id",
        element: (
          <PrivateRoute>
            <UpdateLostFoundItem />
          </PrivateRoute>
        ),
      },
      {
        path: "/items/:id",
        element: (
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/allRecovered",
        element: (
          <PrivateRoute>
            <AllRecoveredItems />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
    ],
  },
];

export default RoutersItems;
