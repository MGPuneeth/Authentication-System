"use client"; // helps us to use all the client side components
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      if (response) {
        console.log("Login succcess", response.data);
      } else {
        console.log("Failed to contact login server");
      }

      toast.success("Logged-in successfully ");

      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed : ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="">Login</h1>
      <hr />
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-3 border border-gray-400 rounded-md focus:outline-none focus:border-gray-100"
        type="text"
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
      <span>
        <Link href="/resetPasswordToken">Reset Password?</Link>
      </span>

      <div>
        <button className="p-2 border border-gray-400 rounded-md focus:outline-none focus:border-gray-100 cursor-pointer">
          <Link href="/signup">Sign Up</Link>
        </button>
        <button
          onClick={onLogin}
          className="p-2 border border-gray-400 rounded-md focus:outline-none focus:border-gray-100 cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
