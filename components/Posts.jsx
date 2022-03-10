import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useState, useEffect } from 'react'
import { db } from '../firebase';
import Post from './Post'

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

  useEffect(() =>
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs);
    }
    ), [db]);

  // console.log(posts);

  return (
    <div>
        {/* Post */}
          {posts.map((post) => (
              <Post
                  key={post.id}
                  id={post.id}
                  accountName={ post.data().accountName}
                  profileImg={ post.data().profileImg}
                  img={ post.data().image}
                  caption={ post.data().caption}
                  // placeInfo={ post.data().placeInfo}
                  // shopTel={ post.shopTel}
                  // shopEmail={ post.shopEmail}
                  />
        ))}
    </div>
  )
}

export default Posts
