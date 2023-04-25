import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from 'react-redux'

export default function Cards() {
  const {name} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };
  return (
    <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <span onClick={() => navigate("/")} class="navbar-brand" style={{ cursor: "pointer" }} >Navbar</span>
           

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                 
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <span>{name ? name : ""}</span>
                         <button onClick={() => navigate('/profile')} className='btn btn-outline-success my-2 my-sm-0' type='submit'>Profile</button>
                        <button onClick={logOut} class="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
                    </form>
                </div>
            </nav>
            <ToastContainer />
        </> 
  );
}
