import React from "react";
import Moment from "react-moment";

function Comment({ avatar, username, comment,timestamp }) {
  return (
    <div className="flex items-center space-x-2 mb-3 mr-4">
      <img
        src={avatar}
        alt="user"
        className="h-8 w-8 rounded-full ring-1 ring-blue-300  object-cover"
      />
      <p className="flex-1 text-sm">
        <span className="font-bold">{username}</span>
        {" "}
        <span>{comment}</span>
      </p>
      <Moment fromNow className="text-xs">{timestamp?.toDate()}</Moment>
    </div>
  );
}

export default Comment;
