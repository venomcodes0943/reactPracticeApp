import ThemeController from "../components/ThemeController.jsx";
import authService from "../services/authService.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../contexts/features/authSlice.js";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleUserRegister = () => {
    authService
      .register(email, password)
      .then((userCredential) => {
        setName("");
        setEmail("");
        setPassword("");
        const { uid, email, displayName } = userCredential.user;
        dispatch(setUser({ uid, email, displayName }));
        navigate("/");
      })
      .catch((error) => {
        const formattedError = error.message
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
          <div className="text-2xl font-bold">Create your account</div>
          <div className="font-semibold ">
            Already have ans account ?
            <Link to={"/login"} className="text-sky-600 pl-2">
              Login
            </Link>
          </div>
          {error && <div className="text-red-500 font-bold">{error}</div>}
        </div>
        <div className="mb-2 mx-auto mt-4">
          <label htmlFor="email" className="block pb-1 font-bold">
            Name:
          </label>
          <input
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="input input-bordered input-sm w-full rounded-sm"
          />
        </div>
        <div className="mb-2 mx-auto mt-4">
          <label htmlFor="email" className="block pb-1 font-bold">
            Email:
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="input input-bordered input-sm w-full rounded-sm"
          />
        </div>
        <div className="mb-2 mx-auto mt-4">
          <label htmlFor="email" className="block pb-1 font-bold">
            Password:
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="input input-bordered input-sm w-full rounded-sm"
          />
        </div>
        <button
          onClick={handleUserRegister}
          className="btn w-full font-bold btn-sm	mt-2 btn-info"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default SignUp;
