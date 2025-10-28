import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
    <Link to="/">Home</Link> | <Link to="/upload">Upload</Link> | <Link to="/register">Register/Login</Link>
  </nav>
);

export default Navbar;
