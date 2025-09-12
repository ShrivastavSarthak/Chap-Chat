"use server";
import {
  answers_url,
  chats_url,
  questions_url,
  user_url,
} from "@/src/utils/constants/apiConstants/api.url";
import {
  apiFetch,
  apiMethod,
} from "@/src/utils/services/api_services/apiFetch";
import { StringFormatService } from "@/src/utils/services/string_services/string_fromat_service";
import { cookies } from "next/headers";

export async function FetchUserDetails() {
  const authToken = (await cookies()).get("auth_token");
  const id = (await cookies()).get("user_id");

  const res = id
    ? await apiFetch({
        method: apiMethod.GET,
        url: StringFormatService(user_url.userDetails, [id.value]),
        header: {
          Authorization: `Bearer ${authToken?.value}`,
        },
      })
    : null;

  return res;
}

export async function CreateChat({
  message,
  orgId,
}: {
  message: string;
  orgId: string;
}) {
  const authToken = (await cookies()).get("auth_token");
  const chatId = (await cookies()).get("chatId");

  const data = chatId?.value
    ? {
        message,
        orgId,
        chatId: chatId.value,
      }
    : {
        message,
        orgId,
      };

  const res = await apiFetch({
    method: apiMethod.POST,
    url: chats_url.createChat,
    body: data,
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
  });

  if (res.status === 200 && !chatId) {
    (await cookies()).set("chatId", res.data?.chatId, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  }

  return res;
}

export async function ChatHistory() {
  const authToken = (await cookies()).get("auth_token");

  const res = apiFetch({
    method: apiMethod.GET,
    url: chats_url.allChatHistory,
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
  });
  return res;
}

export async function PerticularChatHistory(id: string) {
  const authToken = (await cookies()).get("auth_token");

  const res = await apiFetch({
    method: apiMethod.GET,
    url: StringFormatService(chats_url.chatHistory, [id]),
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
  });

  return res;
}

export async function SetExistingChat(id: string) {
  try {
    (await cookies()).set("chatId", id, {
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function CreateQuestion(question: string) {
  const authToken = (await cookies()).get("auth_token");
  const res = await apiFetch({
    method: apiMethod.POST,
    url: questions_url.createQuestion,
    body: { question: question },
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
  });
  return res;
}

export async function GetAnswersList() {
  const authToken = (await cookies()).get("auth_token");
  const res = await apiFetch({
    method: apiMethod.GET,
    url: answers_url.getAllAnswers,
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
  });
  return res;
}
