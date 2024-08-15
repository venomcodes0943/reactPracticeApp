import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../contexts/features/authSlice.js";
import authService from "../services/authService.js";
import { useNavigate } from "react-router-dom";
import Loader from "../pages/Loader.jsx";
const ProfileManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      authService.doSignOut();
      navigate("/login");
    } catch (error) {
      throw new Error("Error While Logout:", error);
    } finally {
      setLoading(false);
    }
  };

  {
    loading && <Loader />;
  }
  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="w-10 h-10 ml-2 rounded-full  shadow-lg flex items-center justify-center"
        >
          <div className="text-2xl">H</div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-md z-20 mt-3 w-52 p-2 shadow"
        >
          <li className="mb-1 pb-1">
            <a className="justify-between">
              Create Post
              <span className="badge">New</span>
            </a>
          </li>
          <li className="mb-1 pb-1">
            <a>Settings</a>
          </li>
          <li className="mb-1 pb-1">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileManager;
