import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  return Response.json({
    message: "test",
    session,
  });
}
