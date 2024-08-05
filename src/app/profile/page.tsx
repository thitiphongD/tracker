"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, [router, session, status]);

  return (
    <>
      {status === "authenticated" && session?.user && (
        <div>
          <p>hello {session?.user.email}</p>
          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            color="red"
            variant="soft"
          >
            Sign out
          </Button>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
