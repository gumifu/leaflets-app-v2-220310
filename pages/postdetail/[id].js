import {
  BookmarkIcon,
  EmojiHappyIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon as BookmarkSolidIcon } from "@heroicons/react/solid";
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
import { Map } from "../../components/Map";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import DetailFlyerImage from "../../components/DetailFlyerImage";
import Recomends from "../../components/Recomends";
import { FiExternalLink } from "react-icons/fi";
import { async } from "@firebase/util";
import { db } from "../../firebase";
import GoogleMap from "../../components/GoogleMapComponent";

const DetailPost = ({ post }) => {
  // console.log(post.image);
  // const {
  //   id,
  //   accountName,
  //   profileImg,
  //   img,
  //   caption,
  //   prefectures,
  //   placeInfo,
  //   shopName,
  //   shopEmail,
  //   shopTel,
  //   shopHomepage,
  // } = post;
  const router = useRouter();
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", post.id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, post.id]
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
      await deleteDoc(doc(db, "posts", post.id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", post.id, "likes", session.user.uid), {
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
          collection(db, "posts", post.id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, post.id]
  );
  comments.map((comment) => {
    console.log(comment.id);
  });

  //send comment to firebase!
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    // ????????????????????????
    await addDoc(collection(db, "posts", post.id, "comments"), {
      comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-main">
      <Header />

      <div className="mb:m-16 m-8 max-w-7xl mx-auto">
        <button
          className="  h-14 w-16 text-white hover:bg-gray-500 duration-200 ease-in-out rounded-xl mb-2"
          type="button"
          onClick={() => router.back()}
        >
          <p className="">??????</p>
        </button>
        <div className="bg-white border border-black rounded-lg relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* img */}
            <div className="bg-gray-100 h-full p-8 rounded-l-3xl md:col-span-1">
              <DetailFlyerImage
                key={post.id}
                img={post.image}
                subimg={post.image2}
              />
            </div>
            <div className=" md:col-span-1">
              {/* Button */}
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
                    {/* <PaperAirplaneIcon className="btn rotate-45" /> */}
                  </div>
                  <p className="px-5 py-3 mr-5 md:px-0 text-red-400 ">
                    {post.prefectures}
                    {post.place}
                  </p>
                </div>
              )}
              {/* caption */}
              <p className="px-10 py-5">
                <span>{post.shopName}</span>
              </p>
              <p className="px-10 py-5">
                <span>{post.caption}</span>
              </p>

              {/* comments */}
              {comments.length > 0 && (
                <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-center space-x-2 mb-3"
                    >
                      <img
                        src={comment.data().userImage}
                        alt=""
                        className="h-7 rounded-full"
                      />
                      <p className="flex-1 text-sm">
                        <span className="font-bold">
                          {comment.data().accountName}
                        </span>{" "}
                        {comment.data().comment}
                      </p>
                      <Moment fromNow className="pr-5 text-xs text-gray-600">
                        {comment.data().timestamp?.toDate()}
                      </Moment>
                    </div>
                  ))}
                </div>
              )}

              {/* inputbox */}
              {session && (
                <form action="" className="flex items-center p-4">
                  <EmojiHappyIcon className="h-7" />
                  <input
                    type="text"
                    className=" border-none flex-1 focus:ring-0 outline-none"
                    placeholder="?????????????????????..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={!comment.trim()}
                    onClick={sendComment}
                    className=" text-blue-400 font-semibold"
                  >
                    ??????
                  </button>
                </form>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${post.shopName}+${post.prefectures}+${post.place}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 cursor-pointer border-2 bg-blue-400 border-blue-300 border-inherit hover:border-white/0 p-2 flex items-center justify-center rounded-lg hover:bg-blue-500 hover:rounded-tr-none duration-300"
              >
                <img src="/Googlemaps-type.svg" className="md:h-5 h-3" />
                <FiExternalLink className="text-lg text-white ml-2" />
              </a>
              <Map coordinates={post.coordinates} />
              {/* <GoogleMap/> */}
            </div>
          </div>
        </div>
      </div>
      <Recomends />
    </div>
  );
};

export default DetailPost;

export async function getServerSideProps({ params }) {
  // console.log(params);
  const id = params.id;
  const postSnapshot = await getDoc(doc(db, "posts", id));
  // const post = postSnapshot.data();
  const post = postSnapshot.data();
  post.timestamp = post.timestamp.toString();

  // const post = JSON.parse(JSON.stringify(post1));

  post.id = postSnapshot.id;
  // console.log(post);
  return {
    props: {
      post,
    },
  };
  // const id = params;
  // const result = await getDocs(collection(db, "posts"));
  // const posts = result.docs.map((doc) => {
  //   const data = doc.data();
  //   data.id = doc.id;
  //   return data;
  // });
  // const result = await getDocs(collection(db, "posts"));
  // const result = await db.collection('posts').doc(id).get()
  // console.log(posts);
  // return {
  //   props: {
  //     posts: {
  //       // ...result.data(),
  //       // timestamp:result.data().timestamp.toMillis()
  //     },
  //   }
  // }
}

// export async function getStaticPaths() {
//   const postSnapshot = await getDocs(collection(db, "posts"));
//   const posts = postSnapshot.docs.map((doc) => {
//     const data = doc.data();
//     data.id = doc.id;
//     return data;
//   });
//   const paths = posts.map((post) => ({
//     params: {
//       id: post.id.toString(),
//     },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const id = params.id;
//   const postSnapshot = await getDoc(doc(db, "posts", id));
//   // const post = postSnapshot.data();
//   const post = postSnapshot.data();
//   post.timestamp = post.timestamp.toString();

//   // const post = JSON.parse(JSON.stringify(post1));

//   post.id = postSnapshot.id;
//   //   console.log(jsonPost);
//   return {
//     props: {
//       post,
//     },
//   };
// }

// export const getStaticPaths = async () => {
//   const snapshot = await getDocs(collection(db, 'posts'));
//   const paths = snapshot.docs.map(doc => {
//     return {
//       params: {
//         id: doc.id.toString()
//       }
//     }
//   })

//   return {
//     paths,
//     fallback:false
//   }
// }

// export const getStaticProps = async (context) => {
//   const id = context.params.id;

//   const docRef = doc(db, "posts", id);
//   const docSnap = await getDoc(docRef);

//   return {
//     props: {
//       postProps:JSON.stringify(docSnap.data())||null
//     }
//   }
// }
