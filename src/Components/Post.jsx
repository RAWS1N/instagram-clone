import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import Comment from "./Comment";

import {
  BsThreeDots,
  BsChat,
  BsBookmark,
  BsBookmarkFill,
  BsHeart,
  BsHeartFill,
  BsEmojiSmile,
} from "react-icons/bs";
import { SlPaperPlane } from "react-icons/sl";

function Post({ image, caption, timestamp, profile, username, id }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const commentsRef = collection(db, "posts", id, "comments");
  const [hasLiked, setHasLiked] = useState(false);
  const created_at = new Date(timestamp?.seconds*1000)
  async function sendComment(e) {
    e.preventDefault();
    await addDoc(commentsRef, {
      comment,
      username: auth.currentUser.displayName,
      avatar: auth.currentUser.photoURL,
      timestamp: serverTimestamp(),
    });
    setComment("");
  }

  useEffect(() => {
    const sortQuery = query(commentsRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(sortQuery, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const likeCollection = collection(db, "posts", id, "likes");
    const unsubscribe = onSnapshot(likeCollection, (snapshot) => {
      setLikes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, [id]);

  async function likePost() {
    const docRef = doc(db, `posts/${id}`, "likes", auth?.currentUser?.uid);
    if (hasLiked) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, {
        username: auth.currentUser.displayName,
      });
    }
  }

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === auth?.currentUser?.uid) !== -1
    );
  }, [likes]);

  return (
    <div className="my-4 bg-white rounded-lg border">
      <div className="flex justify-between items-center    p-2 ">
        <div className="flex gap-2 flex-1 ">
          <img
            src={profile}
            alt="logo"
            className="h-12 w-12 rounded-full p-1 border-2 border-red-500"
          />
          <div>
            <h1 className="font-medium">{username}</h1>
            <p className="text-sm">{created_at.toUTCString()}</p>
          </div>
        </div>
        <BsThreeDots />
      </div>
      <img src={image} alt="profile" className="object-cover  w-full" />
      {auth?.currentUser?.uid && (
        <div className="flex justify-between items-center p-4">
          <div className="flex gap-4 items-center">
            <div onClick={likePost}>
              {hasLiked ? (
                <BsHeartFill className="utility-icon text-red-500 hover:text-red-500" />
              ) : (
                <BsHeart className="utility-icon" />
              )}
            </div>
            <BsChat className="utility-icon" />
            <SlPaperPlane className="utility-icon " />
          </div>
          <BsBookmark className="utility-icon" />
        </div>
      )}
      <p className="p-4 truncate">
        {likes.length > 0 && <p>{likes.length} {likes.length > 1 ?'likes':'like'}</p>}
        <span className="font-medium mr-1">{username}</span>
        {caption}
      </p>
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </div>
      )}
      {auth.currentUser && (
        <form
          onSubmit={sendComment}
          className="flex items-center justify-between p-4 border-t"
        >
          <div className="flex items-center flex-1 gap-2">
            <BsEmojiSmile className="utility-icon" />
            <input
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type="text"
              placeholder="Add a comment..."
              className="flex-1 outline-none"
            />
          </div>
          <button
            disabled={!comment.trim()}
            className="text-blue-500 font-medium disabled:text-blue-300"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
