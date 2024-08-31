"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Loading from "@/components/ui/loading";

interface card {
  id: number;
  title: string;
  image: string;
  username: string;
}

const Homepage = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<card[]>([]);

  const getData = async () => {
    const api_url = process.env.API_URL;
    const api_key = process.env.API_KEY;
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await axios.get(
        `http://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=5`
      );
      const data = response.data;
      console.log(38, data.data);
      setData(data.data);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const searchHandle = (event: any) => {
    setSearchText(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    getData();
    console.log(searchText);
  };

  return (
    <div className="min-h-screen min-w-full bg-pink-50 mt-20 ">
      <div className=" p-2 md:p-10 bg-pink-100  mx-4 md:mx-20 mt-5">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex  w-full">
            <div className="absolute pt-3 px-2">
              <svg
                height={20}
                width={20}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
            <div className="w-full">
              <Input
                placeholder="Article name or keywords..."
                onChange={searchHandle}
                className="text-xl pl-10"
              />
            </div>
          </div>
          <Button type="submit" variant={"default"}>
            Search
          </Button>
        </form>
      </div>

      {data.length != 0 ? (
        <div className="h-full p-2 md:p-10 bg-pink-100  mx-4  md:mx-20 flex flex-wrap gap-5 overflow-hidden">
          <div className="flex flex-row gap-5">
            {data.map((item: any) => (
              <Card key={item.id} className="w-full">
                <img
                  src={item.images.original.url}
                  height={""}
                  width={""}
                  alt="images"
                  className=" h-28 min-w-full rounded-lg"
                />

                <CardHeader>
                  {/* <CardTitle>{item.title}</CardTitle> */}
                  <CardTitle>{item.title}</CardTitle>
                  {/* <CardDescription>{item.username}</CardDescription> */}
                </CardHeader>
                {/* <CardContent>
              <p>Card Content</p>
              </CardContent>
              <CardFooter>
              <p>Card Footer</p>
              </CardFooter> */}
              </Card>
            ))}
          </div>
          {data.length != 0 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      ) : (
        <div className="h-full flex items-center  p-2 md:p-10 bg-pink-100  mx-4 justify-center  md:mx-20  gap-5 overflow-hidden">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Homepage;
