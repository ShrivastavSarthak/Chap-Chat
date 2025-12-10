// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./app/auth.config"; // Edge-safe (no DB adapter)
import { NextResponse } from "next/server";

export const { auth: middlewareAuth } = NextAuth(authConfig);

export default middlewareAuth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname, origin } = req.nextUrl;

  // Only treat exactly /login as public
  const isLoginPage = pathname === "/";

  // Not logged in → redirect to /login
  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/", origin));
  }

  // Logged in → trying to access /login → redirect to /home/chat
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/home/chat", origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)"],
};
