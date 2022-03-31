// import React from 'react'
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Post from "../components/Post";
import { db } from "../firebase";

const Bookmark = () => {
    const { data: session } = useSession();
    // const q = query(citiesRef, where("population", ">", 100000), orderBy("population"), limit(2));
    // const [bookmark, setBookmark] = useState([]);
    // const id = session.user.uid;
    // useEffect(
    //     () => {
    //     onSnapshot(
    //           query(
    //             collection(db, "posts", id, "likes"),
    //             orderBy("timestamp", "desc")
    //           ),
    //           (snapshot) => setBookmark(snapshot.docs)
    //         ),
    //       [db, id]
    //     }, [])
    // console.log(bookmark);

  return (
      <div>
          <Post/>
    </div>
  )
}

export default Bookmark
