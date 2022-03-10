import {
    BookmarkIcon,
    ChatIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { db } from '../firebase';

const Post = ({id, accountName, profileImg, img, caption }) => {
    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);

    // likes
    useEffect(() =>
        onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
            setLikes(snapshot.docs)
        ),
        [db, id]
    );

    //hasliked
    useEffect(() =>
        setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !==-1), [likes]);

    //Confirmation of like? or not?
    const likePost = async () => {
        if (hasLiked) {
            //delete!!!!!
            await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid));
        } else {
            await setDoc(doc(db, "posts", id, 'likes', session.user.uid), {
                //If you want to send more data
                accountName: session.user.name,
                timestamp: serverTimestamp(),
            });
        }
    };

    console.log(hasLiked);

    // snapshot comment!
    useEffect(() => onSnapshot(query(collection(db, 'posts', id, 'comments'), orderBy('timestamp', 'desc')), snapshot => setComments(snapshot.docs)), [db,id]);

    //send comment to firebase!
    const sendComment = async (e) => {
        e.preventDefault();

        const commentToSend = comment;
        setComment('');

        await addDoc(collection(db, 'posts', id, 'comments'), {
            comment: commentToSend,
            username: session.user.name,
            userImage: session.user.image,
            timestamp: serverTimestamp(),
        });
    }
  return (
    <div className='bg-white my-7 border rounded-sm'>
        {/* img */}
        <img src={img} alt="" className="object-cover w-full" />
        {/* Button */}
        {session && (
            <div className=" flex  justify-between px-4 pt-4">
                <div className="flex space-x-4 items-center">
                {
                    hasLiked ? (
                    <HeartIconFilled onClick={likePost} className='btn text-red-500'/>
                    ):(
                    <HeartIcon onClick={likePost} className='btn'/>
                    )
                }

                    <ChatIcon className='btn'/>
                    <PaperAirplaneIcon className='btn rotate-45'/>
                </div>
                <BookmarkIcon className='btn'/>
            </div>
          )}
          <div className="">
                {likes.length>0 &&(
                        <p className="font-bold ml-1 ">{likes.length} いいね</p>
                )}
          </div>
        {/* header */}
          <div className="flex items-center p-5 truncate ">
            <img src={profileImg} alt="" className=" rounded-full h-12 w-12 object-contain border p-1 mr-3" />
              <p className="flex-1 font-bold">{accountName}</p>

              <DotsHorizontalIcon className='h-5'/>
        </div>
        {/* caption */}
          <p className="px-10 pb-5 truncate">

              <span>{caption}</span>
          </p>

        {/* comments */}
        {comments.length > 0 && (
          <div className='ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin'>
              {comments.map((comment)=>(
                  <div key={comment.id} className='flex items-center space-x-2 mb-3'>
                      <img src={comment.data().userImage} alt='' className='h-7 rounded-full' />
                      <p className='flex-1 text-sm'>
                          <span className='font-bold'>
                            {comment.data().accountName}
                          </span>{" "}
                          {comment.data().comment}
                      </p>
                      <Moment fromNow className='pr-5 text-xs text-gray-600'>
                          {comment.data().timestamp?.toDate()}
                      </Moment>
                  </div>
              ))}
          </div>
      )}


        {/* inputbox */}
        {session && (
            <form action="" className="flex items-center p-4">
                <EmojiHappyIcon  className='h-7'/>
                <input type="text"
                    className=' border-none flex-1 focus:ring-0 outline-none'
                    placeholder='コメントを残す...'
                    value={comment}
                    onChange={e=>setComment(e.target.value)}
                    />
                  <button
                      type='submit'
                      disabled={!comment.trim()}
                      onClick={sendComment}
                      className=' text-blue-400 font-semibold'
                  >送信</button>
            </form>
        )}

    </div>
  )
}

export default Post
