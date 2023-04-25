import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies            } from "react-cookie";
import { useDispatch           } from "react-redux";
import { Link, useNavigate     } from "react-router-dom";
import { changeUserDetails     } from "../Redux/User/UserSlice";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const dispath = useDispatch();
  // useEffect(() => {
  //   if (cookies.jwt) {
  //     navigate("/");
  //   }
  // }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
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
          dispath(
            changeUserDetails({
              name: data.email,
              userId: data.user,
              image: data.imageUrl,
            })
          );
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="container">
      <h2>Login</h2>
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
        <span>
          Don't have an account ?<Link to="/register"> Register </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
