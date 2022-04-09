import { faker } from "@faker-js/faker";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Nextlink from "next/link";
import { useEffect, useState } from "react";
import { categories } from "../utils/data";
import Story from "./Story";

const Stories = () => {
      const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    }
  const [suggestions, setSuggestions] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    // console.log(suggestions);
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-8">
<h3 className="text-white ml-3">■カテゴリー(未実装)</h3>
      <div className="p-6  overflow-x-scroll scrollbar-thin scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-900 mx-1">
        {/* {session && (
          <Story img={session.user.image} username={session.user.name} />
        )}
        {suggestions.map((profile) => (
          <Story
            key={profile.id}
            img={profile.avatar}
            username={profile.name}
          />
        ))} */}
        {/* <Story /> */}
          <div className="flex space-x-2">
        {categories.slice(0, categories.length - 1).map((category) => (
          <div
            className="flex flex-col items-center justify-center"
          >
            <img
            key={category.image}
            src={category.image}
            className='h-20 w-20 mx-10 rounded-full border-red-500 border-2 object-cover cursor-pointer hover:scale-110 transition transform duration-200 ease-out mb-1'
            alt="category" />
        <p className="text-xs w-24 truncate text-center text-white">{category.name}</p>
          </div>
        ))}
          </div>
      </div>
    </div>
  );
};

export default Stories;
