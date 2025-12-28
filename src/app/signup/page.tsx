"use client"; // helps us to use all the client side components
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { log } from "console";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const [loading, setLaoding] = React.useState(false);

  const onSignup = async () => {
    try {
      setLaoding(true);
      const response = await axios.post("/api/users/signup", user);
      if (response) {
        console.log("Signup succes", response.data);
      } else {
        console.log("Something went wrong");
      }

      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">{loading ? "Processing" : "Sign Up"}</h1>
      <hr />
      <hr />

      <label htmlFor="username">Username</label>
      <input
        className="p-3 border border-gray-400 rounded-b-md focus:outline-none focus:border-gray-100"
        type="text"
        id="username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder="Username"
      />

      <label htmlFor="email">Email</label>
      <input
        className="p-3 border border-gray-400 rounded-md focus:outline-none focus:border-gray-100"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-3 border border-gray-400 rounded-md focus:outline-none focus:border-gray-100"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="Password"
      />
      <hr />
      <hr />
      <hr />
      <button
        onClick={onSignup}
        className="p-2 border border-gray-400 rounded-md focus:outline-none focus:border-gray-100 cursor-pointer"
      >
        {buttonDisabled ? "No Signup" : "Sign Up"}
      </button>
      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}
