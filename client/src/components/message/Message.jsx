import React from "react";
import "./message.css";
import { format } from "timeago.js";

function Message({ own, message }) {
  return (
    <div className={`message ${own ? "own" : ""}`}>
      <div className="messageTop">
        <img
          src="https://randomuser.me/api/portraits/women/57.jpg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
