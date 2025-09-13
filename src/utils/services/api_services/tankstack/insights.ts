import {
  GetAllInsightsQuestions,
  GetInsightSummary,
} from "@/src/app/(main)/home/(insAnsLayout)/insight/action";
import { useQuery } from "@tanstack/react-query";

export function GetAllInsightsQuestionQuery() {
  return useQuery({
    queryKey: ["GET_ALL_INSIGHT"],
    queryFn: () => GetAllInsightsQuestions(),
  });
}

export function GetInsightsSummaryQuery(qId: string) {
  return useQuery({
    queryKey: ["FETCH_INSIGHT_SUMMARY"],
    queryFn: () => GetInsightSummary(qId),
  });
}
