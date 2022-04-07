import { useSession } from "next-auth/react";
import React from "react";
import FilterdCard from "./FilterCard";
import MiniProfile from "./MiniProfile";
import Post from "./Post";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Flyers = () => {
  const { data: session } = useSession();
  return (
    <main>
      <div
        className={` grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 mx-auto ${
          !session && "!grid-cols-2"
        }`}
      >
        <section className="col-span-5 mx-3">
          <div className=" mx-auto md:mb-5 mb-2  px-2">
            <FilterdCard />
          </div>

          {/* section */}
          {/* Stories */}
          {/* <Stories/> */}
          {/* Pots */}
          <Posts />
        </section>

        {session && (
          <section className="hidden 2xl:inline-grid 2xl:col-span-1">
            {/* MiniProfile */}
            <div className="fixed top-32 mr-5">
              <MiniProfile />
              {/* <div className="max-w-7xl mx-auto md:my-5 my-2 p-5"> */}
              {/* <FilterdCard /> */}
              {/* </div> */}
              {/* Suggestion */}
              <Suggestions />
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Flyers;
