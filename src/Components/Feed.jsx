import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";
import {auth} from '../firebaseConfig'

function Feed() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>
      {auth.currentUser && <section className=" hidden xl:grid-inline xl:block md:col-span-1">
        <div className="">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>}
    </main>
  );
}

export default Feed;
