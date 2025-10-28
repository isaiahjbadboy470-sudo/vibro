import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";

const Video = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const fetchVideo = async () => {
    const res = await fetch("/.netlify/functions/supabase?path=videos&method=GET");
    const data = await res.json();
    const vid = data.videos.find(v => v.id.toString() === id);
    setVideo(vid);

    // Fetch comments
    const resComments = await fetch("/.netlify/functions/supabase?path=comments&method=GET", {
      method: "POST",
      body: JSON.stringify({ video_id: id }),
    });
    const cdata = await resComments.json();
    setComments(cdata.comments);
  };

  const handleComment = async () => {
    const res = await fetch("/.netlify/functions/supabase?path=comment&method=POST", {
      method: "POST",
      body: JSON.stringify({
        user_id: "demo_user", // Replace with logged-in user ID
        video_id: id,
        comment_text: newComment,
      }),
    });
    const data = await res.json();
    if (!data.error) {
      setComments([...comments, { user_id: "demo_user", comment_text: newComment }]);
      setNewComment("");
    }
  };

  useEffect(() => {
    fetchVideo();
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <h1>{video.title}</h1>
      <video width="600" height="400" controls src={video.video_url}></video>
      <p>{video.description}</p>
      <h3>Comments</h3>
      {comments.map((c, i) => (
        <Comment key={i} comment={c} />
      ))}
      <input
        placeholder="Add a comment"
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
      />
      <button onClick={handleComment}>Post Comment</button>
    </div>
  );
};

export default Video;
