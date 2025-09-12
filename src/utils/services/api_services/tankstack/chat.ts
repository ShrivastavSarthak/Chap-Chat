import {
  ChatHistory,
  GetAnswersList,
  PerticularChatHistory,
} from "@/src/app/(main)/home/action";
import { useQuery } from "@tanstack/react-query";

export function GetChatHistory() {
  return useQuery({
    queryKey: ["GET_CHAT_HISTORY"],
    queryFn: () => ChatHistory(),
  });
}

export function GetPerticularChatsData(id: string) {
  return useQuery({
    queryKey: ["FETCH_CHAT_DATA"],
    queryFn: () => PerticularChatHistory(id),
  });
}

export function GetAnswerCountQuery() {
  return useQuery({
    queryKey: ["GET_ANSWER_COUNT"],
    queryFn: () => GetAnswersList(),
  });
}
