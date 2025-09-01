"use server";

import {
  apiFetch,
  apiMethod,
} from "@/src/utils/services/api_services/apiFetch";
import { cookies } from "next/headers";

export async function saveEmail(email: string) {
  const res = await apiFetch({
    method: apiMethod.POST,
    url: "/auth/otp",
    body: { email },
  });

  if (res.status === 200) {
    (await cookies()).set("token", res.data?.data, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 5,
    });
    (await cookies()).set("email", email, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 5,
    });
  }

  return res;
}

export async function verifyOtp(Otp: string) {
  const token = (await cookies()).get("token");
  const email = (await cookies()).get("email");

  const res = await apiFetch({
    method: apiMethod.POST,
    url: "/auth/validate",
    body: {
      token: token?.value,
      email: email?.value,
      otp: Otp,
    },
  });

  if (res.status === 200) {
    (await cookies()).set("auth_token", res.data?.data?.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    (await cookies()).set("user_id", res.data?.data?.user?._id, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    (await cookies()).delete("token");
    (await cookies()).delete("email");
  }

  return res;
}
