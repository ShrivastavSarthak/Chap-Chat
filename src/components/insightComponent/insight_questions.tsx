"use client";
import { Badge } from "@/src/lib/components/ui/badge";
import { Card, CardContent } from "@/src/lib/components/ui/card";
import { useSidebar } from "@/src/lib/components/ui/sidebar";
import { text_size } from "@/src/utils/constants/css.constants";
import { GetAllInsightsQuestionQuery } from "@/src/utils/services/api_services/tankstack/insights";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Mosaic } from "react-loading-indicators";

export interface QuestionInsight {
  questionId: string;
  question: string;
  responseCount: number;
  askedAgo: string;
}

export default function InsightComponents() {
  const { data, isFetching } = GetAllInsightsQuestionQuery();
  const [insightArray, setInsightArray] = useState<QuestionInsight[]>([]);

  useEffect(() => {
    if (data?.status === 200) {
      setInsightArray(data.data?.data);
    }
  }, [data]);
  const navigate = useRouter();
  const { isMobile } = useSidebar();
  return (
    <>
      {!isMobile && (
        <h1 className={`${text_size.p1} font-[600] mb-6`}>Insight</h1>
      )}
      <div className="w-full flex flex-col gap-4">
        {!isFetching ? (
          <>
            {insightArray.map((ques) => (
              <Card
                key={ques.questionId}
                className="w-full cursor-pointer rounded-2xl border border-[#CEEDFD] shadow-[0_7px_15px_0_rgba(25,169,249,0.10)]"
                onClick={() => {
                  navigate.push(`/home/insight/${ques.questionId}`);
                }}
              >
                <CardContent>
                  <p
                    className={`${text_size.p3} mb-2 text-[#A4860A] font-[600]`}
                  >
                    You asked this {ques.askedAgo}
                  </p>
                  <p className={`${text_size.p2} mb-2 font-[600]`}>
                    {ques.question}
                  </p>

                  <div className="w-full mt-3 flex flex-col sm:flex-row justify-start items-start sm:items-end gap-2 sm:gap-3">
                    <Badge className="bg-[#19A9F91F] rounded-3xl px-2 py-1 flex items-center gap-2">
                      <FaUser className="text-[#19A9F9]" />
                      <span
                        className={`${text_size.p3} text-[#19A9F9] font-[600]`}
                      >
                        {ques.responseCount} responses
                      </span>
                    </Badge>

                    {/* <Badge className="bg-[#19A9F91F] rounded-3xl px-2 py-1 flex items-center gap-2">
                  <FaClock className="text-[#19A9F9]" />
                  <span className={`${text_size.p3} text-[#19A9F9] font-[600]`}>
                    Updated 3 hrs ago
                  </span>
                </Badge> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <div className="h-full flex flex-col justify-center items-center">
            <Mosaic color="#19A9F9" size="small" text="" textColor="" />
            <h1 className={`${text_size.p2} font-[600] mt-4`}>Loading...</h1>
          </div>
        )}
      </div>
    </>
  );
}
