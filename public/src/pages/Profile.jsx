import React from "react";
import Cards from "./Cards";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeUserDetails } from "../Redux/User/UserSlice";

function Profile() {
  const [image12, setImage] = useState("");
  const { name, userId, image } = useSelector((state) => state.user);
  console.log(image);
  const dispatch = useDispatch();

  const uploadImage = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image12);
    formData.append("userId", userId);

    const config = {
      header: {
        "content-type": "multipart/form-data",
        userId: userId,
      },
      withCredentials: true,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:4000/profile",
        formData,
        config
      );
      dispatch(changeUserDetails({ image: data.imageUrl, name, userId }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <section class="vh-100" style={{ backgroundColor: "#eee;" }}>
          <Cards />
          <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-12 col-xl-8">
                <div class="card" style={{ borderRadius: "15px" }}>
                  <div class="card-body text-center">
                    <div class="mt-3 mb-4">
                      <img
                        src={
                          image12
                            ? URL.createObjectURL(image12)
                            : `/images/${image}`
                        }
                        alt="profile pic"
                        class="rounded-circle img-fluid"
                        style={{ width: "50px;",height:"100px" }}
                      />
                    </div>
                    <h4 class="mb-2">{name}</h4>
                  </div>
                  <form action="">
                    <div
                      class="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{
                        backgroundColor: "#efefef",
                        borderRadius: "5px",
                      }}
                    >
                   
                      <input
                      
                        type="file"
                        style={{  width: "230px", height: "50px" ,backgroundColor:"blueviolet" }}
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                    <div class="d-flex pt-1">
                      <button
                        type="button"
                        class="btn btn-dark me-1 flex-grow-1"
                        style={{ width: "256px" }}
                        onClick={uploadImage}
                      >
                        Update Image
                      </button>
                      {/* <button type="button" class="btn btn-primary flex-grow-1">Follow</button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
