import { Link, useNavigate } from "react-router-dom";
import ThemeController from "../components/ThemeController.jsx";
import { useState } from "react";
import authService from "../services/authService.js";
import authSlice, { setUser } from "../contexts/features/authSlice.js";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = () => {
    authService
      .signIn(email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email, displayName }));
        navigate("/");
      })
      .catch((err) => {
        const formattedError = error?.message
          .split("Firebase: Error (auth/")[1]
          .replace(").", "");
        setError(formattedError);
        console.error("Error creating user: ", error);
      });
  };
  return (
    <div className="h-screen flex justify-center items-center w-screen px-4">
      <div className="absolute top-4 right-0 md:right-4">
        <ThemeController />
      </div>
      <div className="max-w-md shadow-md px-2 md:px-4 py-4 md:py-6 border border-slate-400 rounded-md">
        <div className="text-center">
          <div className="text-2xl font-bold">Sign in to your account</div>
          <div className="font-semibold ">
            Don&apos;t have any account ?
            <Link to={"/signup"} className="text-sky-600 pl-2">
              Sign up
            </Link>
          </div>
          {error && <div className="text-red-500 font-bold">{error}</div>}
        </div>
        <div className="mb-2 mx-auto mt-4">
          <label htmlFor="email" className="block pb-1 font-bold">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="input input-bordered input-sm w-full rounded-sm"
          />
        </div>
        <div className="mb-2 mx-auto mt-4">
          <label htmlFor="email" className="block pb-1 font-bold">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="input input-bordered input-sm w-full rounded-sm"
          />
        </div>
        <button
          onClick={handleLogin}
          className="btn w-full font-bold btn-sm	mt-2 btn-info"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
