import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { errorToast, successToast } from "../utils";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.value);
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };
  console.log(signupInfo);

  const handleSignup = async (e) => {
    e.preventDefault();
    // console.log(signupInfo)
    // const {name,email,password}=signupInfo;
    if (
      signupInfo.name === "" ||
      signupInfo.email === "" ||
      signupInfo.password === ""
    ) {
      return errorToast("All fields are required");
    }
    try {
      const signupUrl = "http://localhost:8080/auth/signup";
      const response = await fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const res = await response.json();
      const { success, message,error} = res;
      if (success) {
        successToast(message);
        // setSignupInfo({
        //     name:"",
        //     email:"",
        //     password:""
        // });
        setTimeout(() => {
          navigate("/login");
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="Name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            value={signupInfo.name}
            name="name"
            id="name"
            autoFocus
            placeholder="Enter Your Name"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            value={signupInfo.email}
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
            value={signupInfo.password}
            name="password"
            id="password"
            autoFocus
            placeholder="Enter Your Password"
          />
        </div>

        <div>
          <button type="submit">Signup</button>
        </div>
        <div>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
