import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => (
  <div style={{ margin: "10px", border: "1px solid #ccc", padding: "10px" }}>
    <video width="320" height="240" controls src={video.video_url}></video>
    <h3>{video.title}</h3>
    <p>{video.description}</p>
    <Link to={`/video/${video.id}`}>View</Link>
  </div>
);

export default VideoCard;
