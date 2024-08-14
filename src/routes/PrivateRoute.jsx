import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUser, clearUser } from "../contexts/features/authSlice";
import authService from "../services/authService";
import Loader from "../pages/Loader";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    authService.getCurrentUser().then((user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email, displayName }));
      } else {
        dispatch(clearUser());
      }
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!status) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
