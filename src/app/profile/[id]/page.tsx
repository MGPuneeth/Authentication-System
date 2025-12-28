import React from "react";

export default function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const parameters = React.use(params);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <hr />
      <hr />
      <span className="text-4xl ">Profile Page </span>
      <span className="bg-orange-500 p-2 rounded-md text-black font-bold">
        {parameters.id}
      </span>
    </div>
  );
}
