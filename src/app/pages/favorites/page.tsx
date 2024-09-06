"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Inter } from "next/font/google";
import { getFavoritesFromFirebase } from "@/firebase/firebaseSlice";
import { useRouter } from "next/navigation";
import { removeFavorite } from "@/firebase/firebaseSlice";
import Loading from "@/components/ui/loading";
import PaginationSection from "@/components/ui/PaginationSection";

const inter = Inter({
  weight: ["500", "700"],

  subsets: ["latin-ext"],
});

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = favorite.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const loggedInUser = localStorage.getItem("userId");
      if (loggedInUser) {
        const data = await getFavoritesFromFirebase(loggedInUser);
        setUser(loggedInUser);
        setFavorite(data);
        setLoading(false);
      } else {
        toast.error("User not logged in");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFavorite = async (item: any) => {
    setLoading(true);
    const removedItem = await removeFavorite(user, item.id);
    if (removedItem) {
      toast.success("Item removed from favorite");
      // setLoading(false);
      window.location.reload();
    } else {
      setLoading(false);
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="min-w-full min-h-screen bg-pink-50 pt-6">
      {loading ? (
        <div className="h-full relative flex items-center  p-2 md:p-10 bg-pink-100  mx-4 justify-center  md:mx-20  gap-5 overflow-hidden">
          <Loading />
        </div>
      ) : user != "" ? (
        favorite.length != 0 ? (
          <div className="min-h-full p-2 md:p-10 bg-pink-100  mx-4  md:mx-20 flex flex-wrap gap-5 overflow-hidden">
            <div className="flex w-full flex-wrap justify-center  gap-8">
              {currentItems.map((fav: any) => (
                <Card key={fav.id}>
                  <img
                    src={fav.images.original.url}
                    height={""}
                    width={""}
                    alt={fav.title}
                    className=" h-48 min-w-full rounded-lg"
                  />

                  <CardHeader>
                    <abbr
                      className="cursor-pointer hover:scale-150 transition-all active:animate-ping"
                      title="Click to remove from favorite "
                      onClick={() => handleFavorite(fav)}
                    >
                      {favSVG}
                    </abbr>
                    <CardTitle className={inter.className}>
                      {fav.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {fav.username != "" ? `@${fav.username}` : ""}
                  </CardContent>
                </Card>
              ))}
            </div>
            {favorite.length != 0 && (
              <PaginationSection
                totalItems={favorite.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center text-center text-2xl font-semibold text-red-700 -mt-20">
            <p>You don&apos;t have any favorite GIF</p>
          </div>
        )
      ) : (
        <div className="flex h-screen items-center text-center justify-center text-2xl font-semibold text-red-700 -mt-20">
          <p>Login first</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
