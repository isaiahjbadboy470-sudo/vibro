import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UploadVideo from "./pages/UploadVideo";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
