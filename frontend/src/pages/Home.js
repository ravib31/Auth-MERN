import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../utils";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("User-Name"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User-Name");
    successToast("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    // window.location.reload();
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      errorToast(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1> Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products &&
          products?.map((item, index) => (
            <ul key={index}>
              <span>
                {item.name} : {item.price}
              </span>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default Home;
