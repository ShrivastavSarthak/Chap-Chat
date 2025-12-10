import {
  ChatHistory,
  PerticularChatHistory,
} from "@/src/app/(main)/home/action";
import { useQuery } from "@tanstack/react-query";

export function GetChatHistory() {
  return useQuery({
    queryKey: [],
    queryFn: () => ChatHistory(),
  });
}

export function GetPerticularChatsData(id: string) {
  return useQuery({
    queryKey: ['FETCH_CHAT_DATA'],
    queryFn: () => PerticularChatHistory(id),
  });
}
