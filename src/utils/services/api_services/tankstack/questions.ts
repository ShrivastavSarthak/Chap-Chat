import { CreateQuestion } from "@/src/app/(main)/home/action";
import { useMutation } from "@tanstack/react-query";

export function CreateQuestionMutate() {
  return useMutation({
    mutationFn: (question: string) => CreateQuestion(question),
  });
}

