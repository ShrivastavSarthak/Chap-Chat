import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "New chat" });
  response.cookies.delete("chatId");
  return response;
}
