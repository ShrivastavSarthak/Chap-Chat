"use client";
import ChatInput from "@/src/components/chat/chat_input";
import ChatsScreen from "@/src/components/chat/chats_screen/chatScreen";
import Suggestions from "@/src/components/chat/suggestions/suggestions";
import { useAppSelector } from "@/src/utils/services/store/hook";

export function NewChatScreen() {
  const chat = useAppSelector((state) => state.chats);

  return (
    <div
      className={`w-full h-full overflow-hidden flex flex-col md:justify-center justify-end  items-center px-5`}
    >
      {chat.length !== 0 && <ChatsScreen />}
      <Suggestions />
      <ChatInput />
    </div>
  );
}
