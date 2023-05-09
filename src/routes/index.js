import { Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import HomeLayout from "../layouts/HomeLayout";
import Chat from "../pages/Chat/Chat";

import Login from "../pages/Login";

function PrivateRoutes({ children }) {
  const token = localStorage.getItem("token") ?? localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return children;
}

const Error = () => {
  return <div>404 Not Found!</div>;
};

const routes = [
  {
    path: "/",
    element: <Navigate to="/chat" replace={true} />,
  },
  {
    path: "/chat",
    element: (
      <PrivateRoutes>
        <HomeLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoutes>
            <Chat />
          </PrivateRoutes>
        ),
      },
      {
        path: ":id",
        element: (
          <PrivateRoutes>
            <Chat />
          </PrivateRoutes>
        ),
      },

      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/not-found",
    element: <Error />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

export default routes;
