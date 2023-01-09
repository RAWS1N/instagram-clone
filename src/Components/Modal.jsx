import React, { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { ModalActions } from "../store/ModalState";
import { FaCameraRetro } from "react-icons/fa";
import { auth, db, storage } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

function Modal() {
  const Modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const filePickerRef = useRef();
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);

  async function uploadPost() {
    if (loading) return;
    setLoading(true);
    const postCollection = collection(db, "posts");
    const docRef = await addDoc(postCollection, {
      username: auth.currentUser.displayName,
      caption: captionRef.current.value,
      profile: auth.currentUser.photoURL,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef);
        const currentDocRef = doc(db, "posts", docRef.id);
        await updateDoc(currentDocRef, {
          image: downloadUrl,
        });
      }
    );

    dispatch(ModalActions.setOpen(false))
    setLoading(false)
    setSelectedFile(null)
  }

  function AddImage(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }
  return (
    <div>
      <Transition.Root show={Modal.open} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => dispatch(ModalActions.setOpen(false))}
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-200"
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
              enter="ease-in-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in-out duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 translaate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-lg transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      alt=""
                      onClick={() => setSelectedFile("")}
                    />
                  ) : (
                    <div
                      onClick={() => filePickerRef.current.click()}
                      className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 cursor-pointer"
                    >
                      <FaCameraRetro className="h-6 w-6" />
                    </div>
                  )}

                  <div className="mt-5 sm:mt-6">
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900 text-center"
                      >
                        Upload a Photo
                      </Dialog.Title>

                      <div>
                        <input
                          type="file"
                          hidden
                          ref={filePickerRef}
                          onChange={AddImage}
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <input
                        ref={captionRef}
                        required={true}
                        type="text"
                        className="border-none focus:ring-0 w-full text-center"
                        placeholder="please  enter a caption"
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-400 text-base font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                      disabled={!selectedFile}
                      onClick={uploadPost}
                    >
                      {loading ? "...uploading" : 'Upload Post'}
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default Modal;
