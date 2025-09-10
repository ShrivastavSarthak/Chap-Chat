import ChatMobileHeader from "@/src/components/mobile_headers/chatMobileHeader";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChatMobileHeader />
      {children}
    </>
  );
}
 