import React from "react";
import Post from "./Post";

export const FilterResultCard = ({ posts }) => {
  return (
    <div className=" max-w-5xl mx-auto">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          accountName={post.accountName}
          profileImg={post.profileImg}
          img={post.image}
          caption={post.caption}
          prefectures={post.prefectures}
          placeInfo={post.place}
          // shopName={ post.data().shopName}
          // shopEmail={ post.data().shopEmail}
          // shopTel={ post.data().shopTel}
          // shopHomepage={ post.data().shopHomepage}
        />
      ))}
    </div>
  );
};
