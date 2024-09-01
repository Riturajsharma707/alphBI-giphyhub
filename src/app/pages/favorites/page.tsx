"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { toast } from "react-toastify";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["500", "700"],

  subsets: ["latin-ext"],
});
const getFavoritesFromFirebase = async () => {
  const querySnapshot = await getDocs(collection(db, "favorite"));

  const data: any = [];
  querySnapshot.forEach((doc: any) => data.push({ id: doc.id, ...doc.data() }));
  return data;
};

const removeFavorite = async (id: any) => {
  try {
    await deleteDoc(doc(db, "favorite", id));
    toast.success("Successfully item removed");
  } catch (e) {
    toast.error("Failed to remove item");
  }
};

const favSVG = (
  <svg
    height={40}
    width={40}
    viewBox="0 0 76 76"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    baseProfile="full"
    enableBackground="new 0 0 76.00 76.00"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        fill="#e7d513"
        fillOpacity="1"
        strokeWidth="0.2"
        strokeLinejoin="round"
        d="M 17.4167,32.25L 32.9107,32.25L 38,18L 43.0893,32.25L 58.5833,32.25L 45.6798,41.4944L 51.4583,56L 38,48.0833L 26.125,56L 30.5979,41.7104L 17.4167,32.25 Z "
      ></path>{" "}
    </g>
  </svg>
);

const Favorites = () => {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFavoritesFromFirebase();
      console.log(data);
      setFavorite(data);
    };
    fetchData();
  }, []);

  const handleFavorite = async (item: any) => {
    console.log(item);
  };

  return (
    <div className="min-w-full  min-h-full bg-pink-50">
      <div className="min-h-full p-2 md:p-10 bg-pink-100  mx-4  md:mx-20 flex flex-wrap gap-5 overflow-hidden">
        <div className="flex flex-wrap justify-center  gap-8">
          {favorite.map((item: any) => (
            <Card key={item.id}>
              <img
                src={item.src}
                height={""}
                width={""}
                alt={item.title}
                className=" h-48 min-w-full  rounded-lg"
              />

              <CardHeader>
                <abbr
                  title="Click to remove from favorite"
                  onClick={() => handleFavorite(item)}
                >
                  {favSVG}
                </abbr>
                <CardTitle className={inter.className}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>{`@${item.username}`}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
