"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function ChatWatcher() {
  const router = useRouter();

  useEffect(() => {
    const chatId = Cookies.get("chatId");
    if (chatId) {
      router.replace(`/home/chat/${chatId}`);
    }
  }, [router]);

  return null;
}
