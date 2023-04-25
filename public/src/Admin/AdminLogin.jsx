import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function AdminLogin() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if(cookies.adminjwt){
  //     console.log(cookies.adminjwt)
  //     navigate("/admin")
  //   }
  // }, [cookies, navigate]);

  const [values, setValues] = useState({ 
    email: "",
    password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/admin");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2>Login to your Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
       
      </form>
      <ToastContainer />
    </div>
  );
}

export default AdminLogin;
