import { lazy, Suspense } from "react";
import Loader from "../pages/Loader";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
const Home = lazy(() => import("../pages/Home"));
const SignUp = lazy(() => import("../pages/SignUp"));
const NotFound = lazy(() => import("../pages/NotFound"));

const routes = [
  {
    path: "",
    element: (
      <Suspense fallback={<Loader />}>
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "signup",
    element: (
      <Suspense fallback={<Loader />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader />}>
        <NotFound />
      </Suspense>
    ),
  },
];

export default routes;
