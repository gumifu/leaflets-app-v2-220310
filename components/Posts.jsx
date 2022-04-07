import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";
import Masonry from "react-masonry-css";
import { LoadingImage } from "./LoadingImage";
import { Hits } from "react-instantsearch-dom";
import { Spinner } from "./Spinner";

const breakpointColumnsObj = {
  default: 4,
  3000: 5,
  // 2000: 5,
  1200: 3,
  1000: 2,
  500: 2,
};

// const posts = [
//     {
//         id: '123',
//         shopName: 'ジーズアカデミーFUKUOKA／エンジニア養成学校',
//         shopImg: '/gs-logo.png',
//         img: 'https://gsacademy.jp/uploads/og-3.png',
//         caption: '福岡市エンジニアフレンドリーシティに所属。エンジニアとしての就職だけでなく、フリーランスになるためのお仕事紹介や共同受託仲間探しまでサポート。',
//         placeInfo:'福岡県福岡市中央区大名 1-3-41 プリオ大名 1F・2F',
//         shopTel:'092-761-5777',
//         shopEmail:'fukuoka@gsacademy.jp',
//     },
// ]

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);
  // const hoge = posts.map((post) => {
  //     console.log(post.id);
  // })

  return (
    <>
      {/* // <div className="grid grid-cols-2 m-14 gap-5 md:grid-cols-4"> */}
      <Masonry
        className="flex animate-slide-fwd"
        breakpointCols={breakpointColumnsObj}
      >
        {/* Post */}
        {/* <Hits hitComponent={Hit} /> */}
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            classification={post.data().classification}
            accountName={post.data().accountName}
            profileImg={post.data().profileImg}
            img={post.data().image}
            subimg={post.data().image2}
            caption={post.data().caption}
            prefectures={post.data().prefectures}
            placeInfo={post.data().place}
            coordinates={post.data().coordinates}

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

export default Posts;
