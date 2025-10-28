import React, { useState } from "react";

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(",")[1];
      const res = await fetch("/.netlify/functions/supabase?path=upload&method=POST", {
        method: "POST",
        body: JSON.stringify({
          user_id: "demo_user", // Replace with logged-in user ID
          file_name: file.name,
          file_content: base64,
          title,
          description
        }),
      });
      const data = await res.json();
      setMessage(data.error ? data.error.message : "Video uploaded!");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} /><br/>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br/>
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} /><br/>
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default UploadVideo;
