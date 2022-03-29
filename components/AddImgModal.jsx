import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtoms";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { db, storage } from "../firebase";
import { Map } from "./Map";
import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { useRouter } from "next/router";

export const AddImgModal = ({ id }) => {
  const [open, setOpen] = useRecoilState(modalState);
  const [loading, setLoading] = useState(false);
  console.log(id);
  const router = useRouter();

  // firebase post!!!
  const uploadPost = async () => {
    setOpen(false);
    setSelectedFile(null);
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
                <div className="mt-10">
                  <div className="mt-10 text-center sm:mt-5 ">
                    <Dialog.Title
                      as="h3"
                      className=" text-lg leading-6 font-medium text-gray-900 cursor-pointer"
                    >
                      Hello
                    </Dialog.Title>
                    <div className="bg-white my-7 border border-black rounded-3xl relative ">
                      {/* img */}
                      <div className="bg-gray-100 p-10 rounded-3xl">
                        {/* <img src={post.image} alt="" className="" /> */}
                        <div className=" ">
                          <button
                            type="button"
                            onClick={() => router.replace("/")}
                          >
                            Click me
                          </button>
                        </div>
                        {id}

                        {/* <p>{shopName}</p>
              <p>{caption}</p> */}
                        {/* <img src={profileImg} alt="" /> */}
                      </div>
                      {/* <Map coordinates={post.coordinates}/> */}
                    </div>
                  </div>
                </div>
                {/* <Map coordinates={post.coordinates}/> */}
                <div className="mt-5 sm:mt-6"></div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
