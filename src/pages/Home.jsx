import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/.netlify/functions/supabase?path=videos&method=GET")
      .then(res => res.json())
      .then(data => setVideos(data.videos));
  }, []);

  return (
    <div>
      <h1>Vibro Home</h1>
      {videos.map(video => <VideoCard key={video.id} video={video} />)}
    </div>
  );
};

export default Home;
