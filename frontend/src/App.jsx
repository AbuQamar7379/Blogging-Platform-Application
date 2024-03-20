import React from "react";
import BlogDashboard from "./components/BlogDashboard/BlogDashboard";
import Register from "./components/AUTH/Register/Register";
import Login from "./components/AUTH/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostBlog from "./components/PostBlog/PostBlog";

export const config = {
  endpoint: "http://localhost:2000",
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/" element={<BlogDashboard />} />{" "}
          <Route path="/post" element={<PostBlog />} />{" "}
        </Routes>{" "}
      </Router>{" "}
    </>
  );
}

export default App;
