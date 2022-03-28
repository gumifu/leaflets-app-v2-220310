import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtoms";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";

export const AddImgModal = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const prefecRef = useRef(null);
  const placeRef = useRef(null);
  const shopNameRef = useRef(null);
  const classificationRef = useRef(null);
  const emailRef = useRef(null);
  const telRef = useRef(null);
  const homepageRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  // firebase post!!!
  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    // 1)Create a post and add to firestore 'posts' collectuion
    // 2)get the post ID for the newly created post
    // 3)upload the image to firebase storage with the post ID
    // 4)get a download URL from fb storage and update to the original post with image

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      accountName: session.user.name,
      caption: captionRef.current.value,
      prefectures: prefecRef.current.value,
      place: placeRef.current.value,
      shopName: shopNameRef.current.value,
      classification: classificationRef.current.value,
      shopEmail: emailRef.current.value,
      shopTel: telRef.current.value,
      shopHomepage: homepageRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });
    console.log("New doc added with ID", docRef.id);
    // img to Storage! & Store
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snaphot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
    console.log(reader);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-30"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-100 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            {/* Modalの中身 */}
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-10 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt=""
                    className="w-full object-contain cursor-pointer"
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <div className="mt-10">
                  <div className="mt-10 text-center sm:mt-5 ">
                    <Dialog.Title
                      as="h3"
                      className=" text-lg leading-6 font-medium text-gray-900"
                    ></Dialog.Title>
                    <div>
                      <input
                        ref={filePickerRef}
                        type="file"
                        hidden
                        onChange={addImageToPost}
                        required
                      />
                    </div>
                    {/* 店名を追加 */}
                    <div className="mt-2 border-b-2">
                      <input
                        className="border-none focus:right-0 w-full text-center"
                        ref={shopNameRef}
                        type="text"
                        placeholder="店名を追加"
                        required
                      />
                    </div>
                    <select
                      ref={classificationRef}
                      name="classification"
                      className="border-none mr-1"
                    >
                      <option value="カフェ">カフェ</option>
                      <option value="スクール">スクール</option>
                      <option value="美容室">美容室</option>
                      <option value="飲食店">飲食店</option>
                      <option value="観光地">観光地</option>
                      <option value="その他">その他</option>
                    </select>
                    {/* キャプションを追加 */}
                    <div className="mt-2 border-b-2">
                      <input
                        className="border-none focus:right-0 w-full text-center"
                        ref={captionRef}
                        type="text"
                        placeholder="キャプションを追加"
                        required
                      />
                    </div>
                    {/* <span class="p-country-name" style="display:none;">Japan</span> */}
                    {/* <div className="flex items-center justify-center mt-5  border-b-2">
                    <p>〒</p>
                      <input
                          className="border-none focus:right-0 w-18 text-center"
                          ref={placeRef}
                          type="text"
                      placeholder="郵便番号"
                      maxlength="8"
                        />
                    </div> */}
                    {/* 場所の追加 */}
                    <div className="mt-5 flex items-center border-b-2">
                      <select
                        ref={prefecRef}
                        name="prefectures"
                        className="border-none mr-1"
                      >
                        <option value="福岡県">福岡県</option>
                        <option value="東京都">東京都</option>
                        <option value="北海道">北海道</option>
                        <option value="山口県">山口県</option>
                        <option value="その他">その他</option>
                      </select>
                      <input
                        className="border-none focus:right-0 w-full text-center"
                        ref={placeRef}
                        type="text"
                        placeholder="場所を追加"
                      />
                    </div>
                    {/* アドレスの追加 */}
                    <input
                      className="mt-5 border-none focus:right-0 w-full text-center"
                      ref={emailRef}
                      type="email"
                      placeholder="Emailアドレス"
                    />
                    {/* 電話番号の追加 */}
                    <input
                      className="mt-5 border-none focus:right-0 w-full text-center"
                      ref={telRef}
                      type="tel"
                      placeholder="電話番号"
                    />
                    {/* ホームページアドレスの追加 */}
                    <input
                      className="mt-5 border-none focus:right-0 w-full text-center"
                      ref={homepageRef}
                      type="url"
                      placeholder="ホームページ"
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  {/* somewhere wrong? */}
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus-within:ring-2 focus:ring-blue-600 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed  hover:disabled:bg-gray-300"
                    onClick={uploadPost}
                  >
                    {loading ? "アップロード中..." : "アップロード"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
