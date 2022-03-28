import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
//   serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import { db } from "../../firebase";
import Nextlink from 'next/link'
import Image from "next/image";
import { Map } from "../../components/Map";


const Post = ({ post }) => {
    const {
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
    } = post;
    // console.log(post.image);
  const { data: session } = useSession();
  return (
    <div className="bg-white my-7 border border-black rounded-3xl relative ">
    {/* img */}
      <div className="bg-gray-100 p-10 rounded-3xl">
          <img src={post.image} alt="" className="" />
        <div className=" ">
        </div>
              <p>{shopName}</p>
              <p>{caption}</p>
              <img src={profileImg} alt="" />
          </div>
          <Map coordinates={post.coordinates}/>
    </div>
  );
};

export default Post;


export async function getStaticProps({ params }) {
    const id = params.id
    const postSnapshot = await getDoc(doc(db, 'posts', id))
    // const post = postSnapshot.data();
    const post1 = postSnapshot.data();
    const post = JSON.parse(JSON.stringify(post1));

  post.id = postSnapshot.id
//   console.log(jsonPost);
  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const postCollection = collection(db, 'posts')
  const postSnapshot = await getDocs(postCollection)
  const posts = postSnapshot.docs.map(doc => {
    const data = doc.data()
    data.id = doc.id
    return data
  })
  const paths = posts.map(post => ({
    params: {
      id: post.id
    }
  }))
  return {
    paths,
    fallback: false
  }
}
