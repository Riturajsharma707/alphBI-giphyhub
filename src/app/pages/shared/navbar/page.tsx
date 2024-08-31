"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full fixed p-3 top-0 item-center text-center bg-slate-700 text-white h-20 flex justify-between ">
      <div className="uppercase font-serif h-full item-center text-center hover:text-blue-400 cursor-pointer active:text-yellow-400 text-lg sm:text-2xl">
        <Link href="/">
          <p className="shadow-xl shadow-black p-2">giphy store</p>
        </Link>
      </div>
      <div className="sm:flex gap-4 p-2 item-center hidden text-center ">
        <Link
          href="/pages/favorites"
          className="hover:text-blue-300 active:text-yellow-500"
        >
          Favorites
        </Link>
        <Link
          href="/pages/auth/signin"
          className="hover:text-blue-300 active:text-yellow-500"
        >
          Login
        </Link>
      </div>

      {/* <div className="flex flex-col gap-2 sm:hidden "> */}
      <div
        className="flex flex-col gap-2 mt-4 sm:hidden"
        onClick={() => setVisible(!visible)}
      >
        <div className="h-[2px]  w-10 bg-white active:bg-blue-400"></div>
        <div className="h-[2px] w-10 bg-white active:bg-blue-400"></div>
        <div className="h-[2px] w-10 bg-white active:bg-blue-400"></div>

        {visible ? (
          <div className="flex flex-col gap-2 bg-slate-800 rounded-md  p-3 ">
            <Link href="/favorites" className="hover:text-blue-300">
              Favorites
            </Link>
            <Link href="/pages/auth/signin" className="hover:text-blue-300">
              Login
            </Link>
          </div>
        ) : null}
      </div>
    </div>
    // </div>
  );
};

export default Navbar;
