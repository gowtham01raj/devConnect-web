import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("gowtham@gmail.com");
  const [password, setPassword] = useState("Abcd@1234");
  const [errorMessage,setErrorMessage]=useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data));
      return navigate("/");
    } catch (err) {
      setErrorMessage(err.response.data);
      console.error(err);
    }
  };

  return (
    <div className="">
      <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xs border p-4 items-center justfiy-center mx-auto mt-20">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <label className="label">Email</label>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            placeholder="mail@site.com"
            required
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>

        <label className="label">Password</label>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>
        <button
          className="btn btn-neutral mt-4 hover:bg-pink-700 "
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-lg font-bold text-red-500 text-center">{errorMessage}</p>
      </fieldset>
    </div>
  );
};

export default Login;
