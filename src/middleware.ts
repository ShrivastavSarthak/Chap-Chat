import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("auth_token")?.value;
  const token = req.cookies.get("token")?.value;

  const path = req.nextUrl.pathname;

  const isLoginPage = path === "/";
  const isOtpPage = path === "/otp";

  // ✅ Case 1: No tokens -> force to "/"
  if (!authToken && !token && !isLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Case 2: User has `token` only (OTP flow)
  if (token && !authToken) {
    if (!(isLoginPage || isOtpPage)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // ✅ Case 3: User has `auth_token` (fully logged in)
  if (authToken) {
    if (isLoginPage || isOtpPage) {
      return NextResponse.redirect(new URL("/home/chat", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|.*\\..*).*)"],
};
