import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";
import Masonry from "react-masonry-css";
import Bookmark from "./Bookmark";

const breakpointColumnsObj = {
  default: 4,
  3000: 5,
  // 2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const Bookmarks = () => {
  const [posts, setPosts] = useState([]);

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
    <>
      {/* // <div className="grid grid-cols-2 m-14 gap-5 md:grid-cols-4"> */}
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={breakpointColumnsObj}
      >
        {/* Post */}
        {posts.map((post) => (

            <Bookmark
              key={post.id}
              id={post.id}
              accountName={post.data().accountName}
              profileImg={post.data().profileImg}
              img={post.data().image}
              caption={post.data().caption}
              prefectures={post.data().prefectures}
              placeInfo={post.data().place}
              // shopName={ post.data().shopName}
              // shopEmail={ post.data().shopEmail}
              // shopTel={ post.data().shopTel}
              // shopHomepage={ post.data().shopHomepage}
            />
        ))}
      </Masonry>
    </>
  );
};

export default Bookmarks;
