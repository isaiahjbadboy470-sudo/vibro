import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import Navbar from "../components/Navbar";
import supabase from "../supabase"; // your frontend supabase client

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const { data, error } = await supabase
          .from("videos")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setVideos(data || []);
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
        {videos.length === 0 && <p>No videos found.</p>}
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
