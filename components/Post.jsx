import { BookmarkIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import { db } from "../firebase";
import Nextlink from "next/link";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState } from "recoil";
import axios from "axios";
import WeatherRef from "./WeatherRef";
import LoadingImage from "./LoadingImage";
import Image from "next/image";
// import { modalState } from "../atoms/modalAtoms";
import { BiCategoryAlt,BiLocationPlus } from "react-icons/bi";
import { MdOutlineCategory } from "react-icons/md";

const Post = ({
  id,
  accountName,
  profileImg,
  classification,
  img,
  subimg,
  caption,
  prefectures,
  placeInfo,
  shopName,
  shopEmail,
  shopTel,
  shopHomepage,
  coordinates,
}) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  // const [isOpen, setIsOpen] = useRecoilState(modalState);

  // likes
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  //hasliked
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  //Confirmation of like? or not?
  const likePost = async () => {
    if (hasLiked) {
      //delete!!!!!
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        //If you want to send more data
        accountName: session.user.name,
        timestamp: serverTimestamp(),
      });
    }
  };

  // console.log(hasLiked);

  // snapshot comment!
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  //send comment to firebase!
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  const loadImage = () => <LoadingImage />;

  return (
    <>
      {/* <p className="text-white">{weather}</p> */}

      <div className="bg-white bg-opacity-10 md:my-5 my-3 md:mx-2 mx-1 rounded-lg relative ">
        <div className="flex items-center justify-between px-3">
          <WeatherRef coordinates={coordinates} />
          <div className="px-1 py-3 rounded-full text-red-400 md:text-base text-sm text-right">
            <div className="flex items-center">
              <div className="flex items-center">
                <MdOutlineCategory  className="hidden md:inline-block"/>
                <p className="">{classification}/</p>
              </div>
              <div className="flex items-center ml-2">
                <BiLocationPlus className="hidden md:inline-block"/>
                <p className="">{prefectures}</p>
              </div>
            </div>
            {/* {placeInfo} */}
          </div>
        </div>
        {/* img */}
        <Nextlink passHref href={`/postdetail/${id}`}>
          <div className="bg-gray-100 p-2 cursor-pointer ">
            <div className="block bg-white shadow-lg shadow-gray-800 w-full h-full">
              <img
                src={img}
                alt=""
                className="object-cover w-full hover:scale-105 transition-all duration-500 ease-in-out "
                layout="responsive"
                objectFit="fill"
                onLoadingComplete={loadImage}
              />
            </div>
          </div>
        </Nextlink>
        {/* Button */}
        {session && (
          <div className="m-2 py-2 truncate">
            {hasLiked ? (
              <div className="flex items-center justify-between">
                <div className="relative btn">
                  <BookmarkSolidIcon
                    onClick={likePost}
                    className="btn text-blue-500"
                  />
                  <div className="">
                    {likes.length > 0 && (
                      <p className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex justify-center items-center text-white">
                        {likes.length + 10}
                      </p>
                    )}
                  </div>
                </div>
                <div className="md:text-base text-sm text-white w-full pl-5">
                  <p className=" ">{caption}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between ">
                <div className="relative btn">
                  <BookmarkIcon
                    onClick={likePost}
                    className="btn text-gray-300"
                  />
                  <div className="">
                    {likes.length > 0 && (
                      <p className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-gray-500 rounded-full flex justify-center items-center text-white">
                        {likes.length + 10}
                      </p>
                    )}
                  </div>
                </div>
                <div className="md:text-base text-sm text-white w-full pl-5">
                  <p className=" ">{caption}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Post;
