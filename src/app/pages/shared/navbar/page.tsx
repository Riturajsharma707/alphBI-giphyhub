"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loginUser = localStorage.getItem("user");
    const userName = loginUser ? loginUser : "";
    setUser(userName);
  }, []);

  const hangleLogout = () => {
    try {
      localStorage.clear();
      router.push("/pages/auth/signin");
      toast.success("Successfully logout");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full fixed p-3 top-0 text-center bg-slate-700 text-white h-20 flex justify-between items-center">
      <div className="uppercase font-serif h-full text-center hover:text-blue-400 cursor-pointer active:text-yellow-400 text-lg sm:text-2xl flex items-center">
        <Link href="/">
          <p className="shadow-xl shadow-black p-2">giphy store</p>
        </Link>
      </div>

      <div className="sm:flex gap-4 p-2 items-center hidden text-center">
        <Link
          href="/pages/favorites"
          className="hover:text-blue-300 active:text-yellow-500"
        >
          Favorites
        </Link>
        {user !== "" ? (
          <Link
            href="/pages/auth/signin"
            className="hover:text-blue-300 active:text-yellow-500"
            onClick={hangleLogout}
          >
            Logout
          </Link>
        ) : (
          <Link
            href="/pages/auth/signin"
            className="hover:text-blue-300 active:text-yellow-500"
          >
            Login
          </Link>
        )}
      </div>

      <div
        className="flex flex-col gap-2 sm:hidden cursor-pointer"
        onClick={() => setVisible(!visible)}
      >
        <div className="h-[2px] w-8 bg-white"></div>
        <div className="h-[2px] w-8 bg-white"></div>
        <div className="h-[2px] w-8 bg-white"></div>
      </div>

      {visible && (
        <div className="absolute right-4 top-16 flex flex-col gap-2 bg-slate-800 rounded-sm p-3 sm:hidden">
          <Link href="/pages/favorites" className="hover:text-blue-300">
            Favorites
          </Link>
          {user !== "" ? (
            <Link
              href="/pages/auth/signin"
              className="hover:text-blue-300 active:text-yellow-500"
              onClick={hangleLogout}
            >
              Logout
            </Link>
          ) : (
            <Link
              href="/pages/auth/signin"
              className="hover:text-blue-300 active:text-yellow-500"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
