import { GetAnswersList } from "@/src/app/(main)/home/action";
import { useQuery } from "@tanstack/react-query";

export function GetAnswersListQuery() {
  return useQuery({
    queryKey: ["GET_ANSWERS_LIST"],
    queryFn: () => GetAnswersList(),
  });
}
