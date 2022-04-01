import { useSession } from "next-auth/react";
import React from "react";
import FilterdCard from "./FilterCard";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Flyers = () => {
  const { data: session } = useSession();
  return (
    <main>
      <div className="max-w-7xl mx-auto mb-10 px-8 sm:px-16 ">
        <section className="pt-6">
          <FilterdCard />
        </section>
      </div>
      <div
        className={` grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto ${
          !session && "!grid-cols-2"
        }`}
      >
        <section className="col-span-2 ml-5">
          {/* section */}
          {/* Stories */}
          {/* <Stories/> */}
          {/* Pots */}
          <Posts />
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
      </div>
    </main>
  );
};

export default Flyers;
