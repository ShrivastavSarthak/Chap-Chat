import {
  GetAllInsightsQuestions,
  GetInsightsByQuestions,
} from "@/src/app/(main)/home/(insAnsLayout)/insight/action";
import { useQuery } from "@tanstack/react-query";

export function GetAllInsightsQuestionQuery() {
  return useQuery({
    queryKey: ["GET_ALL_INSIGHT"],
    queryFn: () => GetAllInsightsQuestions(),
  });
}

export function GetInsightsByQuestionsQuery() {
  return useQuery({
    queryKey: [],
    queryFn: () => GetInsightsByQuestions(),
  });
}
