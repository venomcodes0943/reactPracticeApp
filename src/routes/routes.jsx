import { lazy, Suspense } from "react";
import Loader from "../pages/Loader";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layout/Layout";

const Home = lazy(() => import("../pages/Home"));
const SignUp = lazy(() => import("../pages/SignUp"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Post = lazy(() => import("../pages/Post/Post"));
const CreatePost = lazy(() => import("../pages/Post/CreatePost"));

const routes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/create-post",
        element: (
          <Suspense fallback={<Loader />}>
            <CreatePost />
          </Suspense>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Suspense fallback={<Loader />}>
            <Post />
          </Suspense>
        ),
      },
    ],
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
