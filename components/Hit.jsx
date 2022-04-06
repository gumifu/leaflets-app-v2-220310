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

export const Hit = ({ hit }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
	  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  // const [isOpen, setIsOpen] = useRecoilState(modalState);
console.log(posts.id);
  // likes


  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

	return (

		<div className=' text-white m-10'>
			{
				posts.map((post) => (
					<>
					        {/* img */}
        <Nextlink passHref href={`/postdetail/${post.id}`}>
          <div className="bg-gray-100 p-2 cursor-pointer ">
            <div className=" bg-white shadow-lg shadow-gray-800 ">
              <img
                src={post.data().image}
                alt=""
                className="object-cover w-full hover:scale-105 transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </Nextlink>
          <div className="" >{hit.shopName}</div>
          <div className="" >{hit.caption}</div>
          {/* <div className="">{hit.place}</div>
          <div className="">{hit.objectID}</div> */}
					</>
					))
			}
    </div>
  )
}
