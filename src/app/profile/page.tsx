"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import React from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/user");
    console.log(res.data);

    setData(res.data.data.username);
  };
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <hr />
      <hr />
      <h2>Profile Page</h2>
      <p>
        {data === "nothing" ? (
          "Nothing found"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </p>

      <hr />
      <hr />
      <button
        onClick={onLogout}
        className="p-2 border border-gray-400 rounded-md bg-red-600 focus:outline-none focus:border-gray-100 cursor-pointer"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className=" border border-gray-400 rounded-md bg-red-600 focus:outline-none focus:border-gray-100 cursor-pointer"
      >
        Get User Details
      </button>
    </div>
  );
}
