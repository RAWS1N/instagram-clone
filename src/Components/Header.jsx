import React from "react";
import { BsSearch } from "react-icons/bs";
import { HiHome } from "react-icons/hi";
import { RiMessengerLine, RiCompass3Line } from "react-icons/ri";
import { CgAddR } from "react-icons/cg";
import { RxAvatar } from "react-icons/rx";
import { IoHeartOutline } from "react-icons/io5";
import { auth } from "../firebaseConfig";
import { useDispatch } from "react-redux";
import { ModalActions } from "../store/ModalState";
import { useNavigate } from "react-router-dom";

function Header() {
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const Navigator = useNavigate();
  function handleNavigation() {
    Navigator("/login");
  }

  function handleModelClick() {
    dispatch(ModalActions.setOpen(true));
  }
  return (
    <div className="border-b p-2 sticky top-0 bg-white shadow-sm">
      <div className="flex  items-center justify-between max-w-6xl mx-0 lg:mx-auto gap-4">
        <div className="relative  cursor-pointer  w-24 md:w-32">
          <img
            src="./Instagram_logo.svg.png"
            alt="logo"
            className="object-contain"
          />
        </div>
        <div className="max-w-sm w-full hidden md:block">
          <div className="mt-1 relative p-0 h-10   ">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-event-none">
              <BsSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="outline-none bg-gray-50 border-gray-300  rounded-md border overflow-hidden focus:border-black h-full block w-full pl-10 sm:text-sm"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center justify-end">
          <HiHome className="h-7 w-7 text-gray-900" />
          {auth.currentUser ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <RiMessengerLine className="h-7 w-7 text-gray-900" />
                <div className="absolute top-0 left-4  bg-red-500 rounded-full h-2 w-2"></div>
              </div>
              <CgAddR
                className="h-7 w-7 text-gray-900"
                onClick={handleModelClick}
              />
              <RiCompass3Line className="h-7 w-7 text-gray-900" />
              <div className="relative">
                <IoHeartOutline className="h-7 w-7 text-gray-900" />
                <div className="absolute bg-red-500 -bottom-2 h-1 rounded-full left-3  w-1"></div>
              </div>
              <img
                src={user?.photoURL}
                className="h-12 w-12 border rounded-full"
                alt="user"
              />
            </div>
          ) : (
            <button
              onClick={handleNavigation}
              className="text-cyan-500 tracking-wide"
            >
              sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
