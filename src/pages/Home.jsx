import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom"; // for navigation to Upload page

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const res = await fetch("/.netlify/functions/supabase?path=videos&method=GET");
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (err) {
        console.error(err);
        setError("Could not load videos");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ flex: 1, padding: "1rem" }}>
        <h1>Vibro Home</h1>
        {/* Link to the real Upload.jsx page */}
        <Link to="/upload">
          <button style={{ marginBottom: "1rem" }}>Upload New Video</button>
        </Link>

        {/* Display videos */}
        {videos.length === 0 ? (
          <p>No videos found. Be the first to upload one!</p>
        ) : (
          videos.map((video) => <VideoCard key={video.id} video={video} />)
        )}
      </div>
    </div>
  );
};

export default Home;
