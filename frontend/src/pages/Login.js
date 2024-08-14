import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { errorToast, successToast } from "../utils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  console.log(loginInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(signupInfo)
    // const {name,email,password}=signupInfo;
    if (
      loginInfo.email === "" ||
      loginInfo.password === ""
    ) {
      return errorToast("All fields are required");
    }
    try {
      const loginUrl = "http://localhost:8080/auth/login";
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const res = await response.json();
      const { success, message,error,jwtToken,name} = res;
      if (success) {
        successToast(message);
        localStorage.setItem("Token", jwtToken);
        localStorage.setItem("User-Name", name);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
        // return successToast(message)
      } else if(error){
        const details = error?.details[0]?.message;
        errorToast(details);
      } else if (!success) {
        errorToast(message);
      }
      // console.log(res)
    } catch (error) {
      errorToast(error);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            value={loginInfo.email}
            name="email"
            id="email"
            autoFocus
            placeholder="Enter Your Email..."
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            value={loginInfo.password}
            name="password"
            id="password"
            autoFocus
            placeholder="Enter Your Password"
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          <p>
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
