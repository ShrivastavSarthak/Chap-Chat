"use server";

import { insights_url } from "@/src/utils/constants/apiConstants/api.url";
import {
  apiFetch,
  apiMethod,
} from "@/src/utils/services/api_services/apiFetch";
import { StringFormatService } from "@/src/utils/services/string_services/string_fromat_service";
import { cookies } from "next/headers";

export async function GetAllInsightsQuestions() {
  const authToken = (await cookies()).get("auth_token");

  const res = apiFetch({
    method: apiMethod.GET,
    url: insights_url.getAllInsights,
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
  });
  return res;
}
export async function GetInsightSummary(qId: string) {
  const authToken = (await cookies()).get("auth_token");

  const res = apiFetch({
    method: apiMethod.GET,
    url: StringFormatService(insights_url.getInsightsSummary, [qId]),
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
  });
  return res;
}
