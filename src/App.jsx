import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoPage from "./pages/Video";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import UploadVideo from "./pages/UploadVideo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/c/:videoId" element={<VideoPage />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </Router>
  );
}

export default App;
