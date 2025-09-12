"use server";

import { insights_url } from "@/src/utils/constants/apiConstants/api.url";
import {
  apiFetch,
  apiMethod,
} from "@/src/utils/services/api_services/apiFetch";
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

export async function GetInsightsByQuestions() {
  const authToken = (await cookies()).get("auth_token");

  const res = apiFetch({
    method: apiMethod.GET,
    url: "",
    header: {
      Authorization: `Bearer ${authToken?.value}`,
    },
  });
  return res;
}
