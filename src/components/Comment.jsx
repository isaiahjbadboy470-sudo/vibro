import React from "react";

const Comment = ({ comment }) => (
  <div style={{ borderBottom: "1px solid #ddd", padding: "5px" }}>
    <strong>{comment.user_id}</strong>: {comment.comment_text}
  </div>
);

export default Comment;
