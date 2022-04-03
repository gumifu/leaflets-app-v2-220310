import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";
import { HomeIcon } from "@heroicons/react/solid";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import Nextlink from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session.user.uid);
  return (
    <div className="sticky top-10 m-5 z-50 mb-20">
      <div className="flex shadow-xl shadow-gray-800 items-center justify-between m-w-6xl bg-black rounded-full bg-opacity-20 backdrop-blur-md">
        {/* left */}
        <div
          onClick={() => router.push("/")}
          className=" ml-8 my-2  relative w-20 h-20 hidden lg:inline-grid cursor-pointer "
        >
          <Image
            src="/logo-main-white.svg"
            layout="fill"
            className=""
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="ml-5 my-2 relative w-16 h-16 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="/logo-mark-white.svg"
            layout="fill"
            className=""
            objectFit="contain"
          />
        </div>

        {/* center */}
        <div className=" relative flex mt-1 p-3 rounded-md max-w-lg items-center">
          <div className="absolute inset-y-0 pl-3 flex items-center">
            <SearchIcon className="h-5 w-5 text-gray-50" />
          </div>
          <div
            onClick={() => router.push("/filters")}
            className=" flex items-center justify-center w-full h-full bg-blue-500 rounded-full hover:bg-opacity-80 cursor-pointer"
          >
            <div className="flex items-center justify-center h-14 w-32 pl-5   text-white rounded-full">
              <p>条件検索</p>
            </div>
            <div className="">
              <input
                className="flex-grow  transparent h-14 bg-gray-50 block pl-10 sm:text-sm border-gray-300 focus:ring-blue-100 rounded-full"
                type="text"
                placeholder="検索"
              />
            </div>
          </div>
        </div>

        {/* right */}
        <div className="flex items-center mr-5 justify-end space-x-4">
          <HomeIcon
            onClick={() => router.push("/")}
            className="navBtn text-white"
          />
          <MenuIcon className="h-6 md:hidden cursor-pointer text-white" />
          {session ? (
            <>
              <BookmarkSolidIcon
                onClick={() => router.push("/bookmarks")}
                className="btn text-blue-500"
              />
              <img
                onClick={signOut}
                src={session.user.image}
                alt="profile pic"
                className="h-10 w-10 object-cover rounded-full cursor-pointer"
              />
            </>
          ) : (
            <button className="text-blue-400 text-lg" onClick={signIn}>
              サインイン
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
