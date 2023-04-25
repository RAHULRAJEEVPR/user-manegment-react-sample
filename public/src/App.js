import React from "react";
import Register from "./pages/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";
import AdminHome from "./Admin/AdminHome";
import AdminLogin from "./Admin/AdminLogin";
import EditUser from "./Admin/EditUser";
import AddUser from "./Admin/AddUser";
import Profile from "./pages/Profile";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Cards />} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/admin" element={<AdminHome />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin/adduser" element={<AddUser />} />
        <Route exact path="/admin/edit-user" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}
