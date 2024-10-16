import React, { useState } from "react";
import { useUserStore } from "../store/store";
import { redirect, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {
    setIsLogin,
    setUsername,
    setUserId,
    setEmail,
    setIsAlert,
    setAlertMsg,
    setAlertType,
    setRole
  } = useUserStore();
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    const data = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Username: username,
        Password: password
      })
    })
      .then(data => data.json())
      .then(data => {
        if (data.success) {
          console.log('data:', data)
          setIsLogin(true)
          setUsername(data.User.Username);
          setEmail(data.User.Email);
          setUserId(data.User.UserId)
          setRole(data.User.Role)
          setIsAlert(true);
          setAlertType("success");
          setAlertMsg(data.message);
          console.log("Redirecting")
          localStorage.setItem("crime-tracker-token", data.token);
          localStorage.setItem("crime-tracker-user",JSON.stringify(data.User))
          navigate('/');
        }
        else {
          setIsAlert(true);
          setAlertType("error");
          setAlertMsg(data.message);
        }
      })
      .catch(err => {
        console.log("Error: ", err)
        setIsAlert(true);
        setAlertType("error");
        setAlertMsg(err.message);
      })
  }
  return (
    <div className="auth flex flex-col gap-y-8 h-[100vh] justify-center items-center ">
      <h1 className="text-2xl font-semibold text-center md:text-4xl">Login to your account</h1>
      <input
        type="username"
        value={username}
        onChange={e => setusername(e.target.value)}
        className="input input-bordered input-info w-full max-w-[20rem]"
        id="text"
        placeholder="Enter your username"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="input input-bordered input-info w-full max-w-[20rem]"
        id="password"
        placeholder="Enter your Password"
      />
      <a href="/error" className="underline">
        Forgot Your Password
      </a>
      <a href="/signup" className="underline">
        Don't Have an account?Click here to signup
      </a>
      <button onClick={login} className="btn btn-active btn-info text-xl text-white">
        Login
      </button>
    </div>
  );
};

export default Login;
