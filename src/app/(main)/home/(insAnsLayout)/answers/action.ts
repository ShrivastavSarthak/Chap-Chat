"use server";

import { answers_url } from "@/src/utils/constants/apiConstants/api.url";
import { AnswerInterface } from "@/src/utils/interface/answerInterface";
import {
  apiFetch,
  apiMethod,
} from "@/src/utils/services/api_services/apiFetch";
import { cookies } from "next/headers";

export async function SendAnswer(question: AnswerInterface) {
  const authToken = (await cookies()).get("auth_token");

  const res = apiFetch({
    method: apiMethod.POST,
    url: answers_url.sendAnswer,
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
    body: {
      answer: question.answer,
      points: question.points,
      questionId: question.questionId,
    },
  });
  return res;
}

export async function SendAudioAnswer(formData: FormData) {
  const authToken = (await cookies()).get("auth_token");

  const res = apiFetch({
    method: apiMethod.POST,
    url: answers_url.sendAudioAnswer,
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
    body: formData,
  });
  return res;
}
