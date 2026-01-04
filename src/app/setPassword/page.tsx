"use client"; // helps us to use all the client side components
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function setPasswordPage() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [cursorType, setCursorType] = useState("not-allowwed");
  const [message, setMessage] = useState("");

  const resetPassword = async () => {
    try {
      // settoken(window.location.search.split("=")[1]);

      const response = await axios.post("/api/users/setNewPassword", {
        token: token,
        newPassword: newPassword,
      });

      if (response) {
        console.log("Signup succes", response.data);
        router.push("/login");
      } else {
        console.log("Something went wrong");
      }
    } catch (error: any) {
      setMessage("Something went wrong");
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (
      newPassword === confirmPassword &&
      newPassword.length > 0 &&
      confirmPassword.length > 0
    ) {
      setCursorType("pointer");
    }
  }, [newPassword, confirmPassword]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <label htmlFor="newPassword" className="text-left">
        New Password
      </label>
      <input
        className="p-3 border border-gray-400 rounded-b-md focus:outline-none focus:border-gray-100"
        type="password"
        id="newPassword"
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        placeholder="New Password"
      />
      <label htmlFor="confirmPassword" className="text-left">
        Confirm Password
      </label>
      <input
        className="p-3 border border-gray-400 rounded-b-md focus:outline-none focus:border-gray-100"
        type="text"
        id="confirmPassword"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        placeholder="Confirm Password"
      />
      <button
        onClick={resetPassword}
        className={`p-2 border border-gray-400 rounded-md focus:outline-none focus:border-gray-100 cursor-${cursorType}`}
      >
        Reset Password
      </button>
      <p>{message}</p>
    </div>
  );
}
