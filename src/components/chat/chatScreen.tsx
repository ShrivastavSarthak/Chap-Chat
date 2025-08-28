"use client";
import { useState } from "react";
import ChatInput from "./chat_input";
import Suggestions from "./suggestions/suggestions";
import NewChatsScreen from "./chats_screen/newChatScreen";

export interface ChatInterface {
  query: string;
  response: null | string;
}
export default function ChatScreen() {
  const [newChat, setNewChat] = useState<ChatInterface[]>([]);
  const getInput = (data: string) => {
    setNewChat((prev) => [...prev, { query: data, response: null }]);
  };
  return (
    <div
      className={`w-full h-full overflow-hidden flex flex-col md:justify-center justify-end  items-center`}
    >
      {newChat.length === 0 ? (
        <Suggestions />
      ) : (
        <NewChatsScreen chats={newChat} />
      )}
      <ChatInput getInput={getInput} />
    </div>
  );
}
