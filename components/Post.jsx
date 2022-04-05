import { BookmarkIcon } from "@heroicons/react/outline";
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
// import { modalState } from "../atoms/modalAtoms";

const Post = ({
  id,
  accountName,
  profileImg,
  img,
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
  const [bookmark, setBookmark] = useState([]);
  const [weather, setWeather] = useState("");
  // const [isOpen, setIsOpen] = useRecoilState(modalState);
  const requestUrl = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&daily=weathercode&timezone=Asia%2FTokyo`;

  useEffect(() => {
    axios
      .get(requestUrl)
      .then(function (response) {
        // リクエスト成功時の処理（responseに結果が入っている）
        const weatherRes = response.data.daily.weathercode[0];
        if (weatherRes) setWeather(weatherRes);
        // return weatherRes;

        console.log(weatherRes);
      })
      .catch(function (error) {
        // リクエスト失敗時の処理（errorにエラー内容が入っている）
        console.log(error);
      })
      .finally(function () {
        // 成功失敗に関わらず必ず実行
        console.log("done!");
      });
  }, []);

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

  return (
    <>
      {/* <p className="text-white">{weather}</p> */}
      <WeatherRef coordinates={coordinates} />

      <div className="bg-white bg-opacity-10 my-3 mx-3 rounded-b-2xl relative ">
        {/* img */}
        <Nextlink passHref href={`/postdetail/${id}`}>
          <div className="bg-gray-100 p-2">
            <div className=" bg-white shadow-lg shadow-gray-800">
              <img src={img} alt="" className="object-cover w-full" />
            </div>
          </div>
        </Nextlink>
        {/* Button */}
        <h1>{``}</h1>
        {session && (
          <div className=" flex  justify-between px-4 pt-4 h-300">
            <div className="flex space-x-4 items-center">
              {hasLiked ? (
                <div className="relative btn">
                  <BookmarkSolidIcon
                    onClick={likePost}
                    className="btn text-blue-500"
                  />
                  <div className="">
                    {likes.length > 0 && (
                      <p className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex justify-center items-center text-white">
                        {likes.length}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative btn">
                    <BookmarkIcon onClick={likePost} className="btn" />
                    <div className="">
                      {likes.length > 0 && (
                        <p className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-gray-500 rounded-full flex justify-center items-center text-white">
                          {likes.length}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45 text-white animate-pulse" />

                <div className="absolute -top-2 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex justify-center items-center animate-pulse text-white">
                  3
                </div>
              </div> */}
              {/* <ChatIcon className="btn" />
            <PaperAirplaneIcon className="btn rotate-45" /> */}
            </div>
            {/* <BookmarkIcon className="btn" /> */}
            <p className="px-5 py-3 ml-3 md:px-0 rounded-full truncate text-red-400 w-40 text-right">
              {prefectures}
              {placeInfo}
            </p>
          </div>
        )}

        {/* caption */}
        <p className="md:p-5 p-2 md:text-base text-sm text-white truncate">
          <span>{caption}</span>
        </p>
      </div>
    </>
  );
};

export default Post;
