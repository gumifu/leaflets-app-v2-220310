import { useSession } from "next-auth/react";
import React from "react";
import Bookmarks from "./Bookmarks";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const BookmarkFlyers = () => {
  const { data: session } = useSession();
  return (
    <main
      className={` grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto ${
        !session && "!grid-cols-2"
      }`}
    >
      <section className="col-span-2 ml-5">
        {/* section */}
        {/* Stories */}
        {/* <Stories/> */}
        {/* Pots */}
        <Bookmarks />
      </section>

      {session && (
        <section className="hidden xl:inline-grid xl:col-span-1">
          {/* MiniProfile */}
          <div className="fixed top-30 mr-5">
            <MiniProfile />
            {/* Suggestion */}
            <Suggestions />
          </div>
        </section>
      )}
    </main>
  );
};

export default BookmarkFlyers;
