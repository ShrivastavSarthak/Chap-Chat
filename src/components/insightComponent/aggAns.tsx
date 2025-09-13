"use client";
import { Button } from "@/src/lib/components/ui/button";
import { Card, CardContent } from "@/src/lib/components/ui/card";
import { text_size } from "@/src/utils/constants/css.constants";
import { GoCopy } from "react-icons/go";
import { toast } from "sonner";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/src/lib/components/ui/sidebar";
import { GetInsightsSummaryQuery } from "@/src/utils/services/api_services/tankstack/insights";
import moment from "moment";
import { Mosaic } from "react-loading-indicators";

export default function AggAns({ qId }: { qId: string }) {
  const navigate = useRouter();
  const { data, isFetching } = GetInsightsSummaryQuery(qId);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data?.data?.data?.summary_points);
      toast.success("Copied");
    } catch (err) {
      toast.error("Not copied");
    }
  };
  const { isMobile } = useSidebar();

  return (
    <>
      {!isMobile && (
        <h1 className={`${text_size.p1} font-[600] mb-6`}>Insight</h1>
      )}
      <Button
        variant="ghost"
        className="scale-125 cursor-pointer mb-3 ms-2 mt-2"
        onClick={() => navigate.back()}
      >
        <IoMdArrowRoundBack />
      </Button>
      {isFetching ? (
        <div className="h-full flex flex-col justify-center items-center">
          <Mosaic color="#19A9F9" size="small" text="" textColor="" />
          <h1 className={`${text_size.p2} font-[600] mt-4`}>Loading...</h1>
        </div>
      ) : (
        <Card className="w-full  rounded-2xl border border-[#CEEDFD] shadow-[0_7px_15px_0_rgba(25,169,249,0.10)]">
          <CardContent>
            <div className="w-full flex justify-between items-center">
              <p className={`${text_size.p3} mb-2 text-[#A4860A] font-[600]`}>
                You asked this {moment(data?.data?.data?.createdAt).fromNow()}
              </p>
              <Button
                onClick={handleCopy}
                variant="ghost"
                className="cursor-pointer rounded-full"
              >
                <GoCopy />
              </Button>
            </div>
            <p className={`${text_size.p2} mb-2 font-[600]`}>
              {data?.data?.data?.question}
            </p>
            <p
              className={`${text_size.p3} underline font-[400] text-[#19A9F9]`}
            >
              Aggregate answer
            </p>
            <p className={`${text_size.p3} text-[#585858] mt-2 mb-5`}>
              {data?.data?.data?.summary_points}
            </p>
            {/* <div className="w-full mt-3 flex flex-col sm:flex-row justify-start items-start sm:items-end gap-2 sm:gap-3">
            <span className={`${text_size.p3} text-[#585858] font-[400]`}>
              12 responses
            </span>
          </div> */}
          </CardContent>
        </Card>
      )}
    </>
  );
}
