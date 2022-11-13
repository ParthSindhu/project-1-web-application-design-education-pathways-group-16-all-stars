
import axios from "axios";
import React from "react";

import './css/Comments.css'

function vote(increment, comment_id) {
    console.log("vote", increment, comment_id);
    axios.put(`${process.env.REACT_APP_API_URL}/course/comments?comment_id=${comment_id}`, {increment: increment})
    .catch((err) => {
        console.log(err);
    })
}

export default function Comment({
  comment
}){
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  return (
    <div key={comment.id} className="comment">
      <div className="comment-image-container">
        <img alt="user_pic" src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        <div className="comment-text">{comment.body}</div>
      </div>
      <div className="comment-votes-container">
        <div className="comment-votes-box">
        {/* <input type="button" style="" className="like" /> */}
        {/* <input type="image" src="/like.png" className="like" onClick={vote(1, comment.id)} />  */}
        
        <img alt="upvote" src="/like.png" className="like" onClick={() => vote(1, comment.id)} /> 
        {comment.upvotes}
        </div>
        <div className="comment-votes-box">
        
        <img alt="downvote" src="/dislike.png" className="dislike" onClick={() => vote(-1, comment.id)}/> {comment.downvotes}
        
      </div>
      </div>
    </div>
  );
};