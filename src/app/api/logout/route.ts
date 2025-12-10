// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });

  // Delete the auth_token cookie
  response.cookies.set({
    name: "auth_token",
    value: "",
    maxAge: 0, // expires immediately
    path: "/", // must match original path
  });

  return response;
}
