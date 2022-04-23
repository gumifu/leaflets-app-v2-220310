import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Header from "../components/Header";
import { FilterResultCard } from "../components/FilterResultCard";

const FilteRsresult = () => {
  const router = useRouter();
  const { classification } = router.query;

//   console.log(prefecture);
  console.log(classification);

  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const choosePost = query(
    postsCollectionRef,
    // where("prefectures", "not-in", ["福岡"])
  );

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(choosePost);
      let post = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        post = post.filter((output, index) => {
          return output.classification.includes(classification);
        });
        setPosts(post);
    };
    getPosts();
  }, []);

  return (
    <div className="bg-main">
      <Header />
      <main className="flex mb-20">
        <section className="flex-grow pt-14 px-6">
          {posts.length>0 ? (
          <div className="">
            <FilterResultCard posts={posts} key={posts.map.img} />
          </div>
          ) : (
              <div className="">
            <p className=" text-white">結果はありません...</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default FilteRsresult;
