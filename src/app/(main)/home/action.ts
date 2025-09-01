"use server";
import {
  chats_url,
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

  const res = await apiFetch({
    method: apiMethod.POST,
    url: chats_url.createChat,
    body: {
      message,
      orgId,
    },
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
  });

  return res;
}
