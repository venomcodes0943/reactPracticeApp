import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import authService from "../services/authService";
import { clearUser, setUser } from "../contexts/features/authSlice";
const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          console.log(user);
          const { uid, email, displayName } = user;
          dispatch(setUser({ uid, email, displayName }));
          console.log(status);
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        dispatch(clearUser());
      }
    };

    checkUser();
  }, [dispatch]);

  if (!status) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
