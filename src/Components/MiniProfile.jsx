import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

function MiniProfile() {
  const user = auth.currentUser
  function handleSignOut(){
    signOut(auth)
    window.location.reload()
  }
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <div className="flex items-center gap-2">
        <img
          src={user?.photoURL}
          alt="profile"
          className="p-[2px] h-16 w-16  rounded-full object-cover bg-zinc-900 border"
        />
        <div className="cursor-pointer">
          <h2 className="text-medium">{user?.displayName}</h2>
          <h3 className="text-sm text-gray-500">{user?.email}</h3>
        </div>
      </div>
      <button className="text-cyan-500 text-xs font-medium hover:text-gray-500" onClick={handleSignOut}>sign out</button>
    </div>
  );
}

export default MiniProfile;
