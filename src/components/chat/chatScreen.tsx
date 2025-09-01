"use client";
import { useState } from "react";
import ChatInput from "./chat_input";
import NewChatsScreen from "./chats_screen/newChatScreen";
import Suggestions from "./suggestions/suggestions";
import { ChatInterface } from "@/src/utils/interface/chatInterface";
import { useAppSelector } from "@/src/utils/services/store/hook";

export default function ChatScreen() {
  const chat = useAppSelector((state) => state.chats);
  return (
    <div
      className={`w-full h-full overflow-hidden flex flex-col md:justify-center justify-end  items-center px-5`}
    >
      {chat.length === 0 ? <Suggestions /> : <NewChatsScreen />}
      <ChatInput />
    </div>
  );
}
