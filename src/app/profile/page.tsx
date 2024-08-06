"use client";

import React, { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Box, Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
          <div className="flex gap-2 items-center">
            {session?.user?.image ? (
              <Image
                src={session?.user?.image || "/default-image.png"}
                alt={`${session?.user?.name}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <Box
                width="40px"
                height="40px"
                className="bg-gray-300 rounded-full flex items-center justify-center"
              >
                {session?.user?.name
                  ? session?.user?.name[0].toUpperCase()
                  : ""}
              </Box>
            )}

            <span>{session?.user?.name}</span>
          </div>
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
