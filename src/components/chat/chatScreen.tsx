"use client";
import {
  useAppDispatch,
  useAppSelector,
} from "@/src/utils/services/store/hook";
import ChatInput from "./chat_input";
import ChatsScreen from "./chats_screen/chatScreen";
import Suggestions from "./suggestions/suggestions";
import { GetPerticularChatsData } from "@/src/utils/services/api_services/tankstack/chat";
import { useEffect } from "react";
import { setExistingChat } from "@/src/utils/services/store/slice/chat";

export default function ChatScreen({ chatId }: { chatId: string }) {
  const dispatch = useAppDispatch();
  const chat = useAppSelector((state) => state.chats);
  const { data } = GetPerticularChatsData(chatId);

  useEffect(() => {
    dispatch(setExistingChat(data?.data?.messages));
  }, [data, dispatch]);

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
