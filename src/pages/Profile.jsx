import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/.netlify/functions/supabase?path=profile&method=GET", {
        method: "POST",
        body: JSON.stringify({ user_id: id }),
      });
      const data = await res.json();
      if (!data.error) {
        setUser(data.user);
        setVideos(data.videos);
      }
    };
    fetchProfile();
  }, [id]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h1>{user.username}'s Profile</h1>
      {videos.length === 0 ? (
        <p>No videos uploaded.</p>
      ) : (
        videos.map(video => <VideoCard key={video.id} video={video} />)
      )}
    </div>
  );
};

export default Profile;
