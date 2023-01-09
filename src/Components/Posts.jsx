import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "posts");
    const queryRef = query(collectionRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({...doc.data(),id:doc.id})))
    });
    return () => unsubscribe();
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Posts;
