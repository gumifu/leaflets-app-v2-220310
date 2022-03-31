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
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import { db } from "../../firebase";
import { Map } from "../../components/Map";
import { useRouter } from "next/router";
import Header from "../../components/Header";

const Post = ({ post }) => {
  const router = useRouter();
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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-gray-900 h-screen overflow-y-scroll scrollbar-hide">
      <Header/>

    </div>
  );
};

export default Post;

export async function getStaticProps({ params }) {
  const id = params.id;
  const postSnapshot = await getDoc(doc(db, "posts", id, "likes", session.user.uid));
  // const post = postSnapshot.data();
  const post1 = postSnapshot.data();
  const post = JSON.parse(JSON.stringify(post1));

  post.id = postSnapshot.id;
  //   console.log(jsonPost);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const postCollection = collection(db, "posts");
  const postSnapshot = await getDocs(postCollection);
  const posts = postSnapshot.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });
  const paths = posts.map((post) => ({
    params: {
      id: post.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
