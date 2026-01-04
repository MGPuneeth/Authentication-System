"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { asyncWrapProviders } from "async_hooks";

export default function resetPassword() {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const onReset = async () => {
    const response = await axios.post("/api/users/resetPassword", {
      email: email,
    });
    if (response) {
      setText("Link has been shared to your Email");
      console.log("Email sent", response.data);
    } else {
      setText("Email Not Found!");
      console.log("Eamil not found");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <label htmlFor="email">Email</label>
      <input
        className="p-3 border border-gray-400 rounded-md focus:outline-none focus:border-gray-100"
        type="text"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <button
        onClick={onReset}
        className="p-2 border border-gray-400 rounded-md focus:outline-none focus:border-gray-100 cursor-pointer"
      >
        Verify
      </button>
      <p>{text}</p>
    </div>
  );
}
