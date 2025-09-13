import {
    SendAnswer,
    SendAudioAnswer,
} from "@/src/app/(main)/home/(insAnsLayout)/answers/action";
import { GetAnswersList } from "@/src/app/(main)/home/action";
import { AnswerInterface } from "@/src/utils/interface/answerInterface";
import { useMutation, useQuery } from "@tanstack/react-query";

export function GetAnswersListQuery() {
  return useQuery({
    queryKey: ["GET_ANSWERS_LIST"],
    queryFn: () => GetAnswersList(),
  });
}

export function SendAnswerMutation() {
  return useMutation({
    mutationFn: (question: AnswerInterface) => SendAnswer(question),
  });
}

export function SendAudioAnswerMutation() {
  return useMutation({
    mutationFn: (formData: FormData) => SendAudioAnswer(formData),
  });
}
