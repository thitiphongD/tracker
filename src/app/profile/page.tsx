"use client";

import React from "react";
import { useSession } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {status === "authenticated" && session?.user && (
        <div>
          <p>hello {session?.user.email}</p>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
