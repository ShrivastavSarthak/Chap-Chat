"use client";
import { Button } from "@/src/lib/components/ui/button";
import { ScrollArea, ScrollBar } from "@/src/lib/components/ui/scroll-area";
import { text_size } from "@/src/utils/constants/css.constants";
import { PiChatsBold } from "react-icons/pi";
import { FaChartLine } from "react-icons/fa6";
import { useAppSelector } from "@/src/utils/services/store/hook";
import AskOrg from "../../ask_org/askOrg";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function Suggestions() {
  const chat = useAppSelector((state) => state.chats);
  const answerCount = useAppSelector((state) => state.answers.length);
  const navigate = useRouter();
  return (
    <>
      <div className="w-full max-w-[715px]   mb-6">
        {chat.length === 0 && (
          <h4 className={`${text_size.p3} mb-[0.4rem] `}>
            Let’s get you started
          </h4>
        )}

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex justify-start items-center   gap-3 mt-[0.4rem]">
            <AskOrg>
              <Button
                variant="default"
                className="md:px-[20px] px-[16px] md:py-[16px] py-[12px]   flex justify-center items-center gap-[12px] bg-[#EFEFEF] border border-[#E8E8E8] rounded-xl cursor-pointer"
              >
                <HiOutlineQuestionMarkCircle className=" scale-125 text-[#3186C3]" />
                <span className={`${text_size.p3} text-[#4B5563] font-[600]`}>
                  Ask Org
                </span>
              </Button>
            </AskOrg>
            <Button
              variant="default"
              className="md:px-[20px] px-[16px] md:py-[16px] py-[12px] flex justify-center items-center gap-[12px] bg-[#EFEFEF] border border-[#E8E8E8] rounded-xl cursor-pointer relative"
              onClick={() => navigate.push("/home/answers")}
            >
              <div className="absolute rounded-full bg-[#F04438] min-w-5 h-5 flex justify-center items-center top-[-7px] right-[-5px] px-1">
                <p className={`${text_size.p3} font-[600] text-white`}>
                  {answerCount > 99 ? "99+" : answerCount}
                </p>
              </div>
              <PiChatsBold className="scale-125 text-[#12CC65]" />
              <span className={`${text_size.p3} text-[#4B5563] font-[600]`}>
                Answer
              </span>
            </Button>
            <Button
              variant="default"
              className="md:px-[20px] px-[16px] md:py-[16px] py-[12px]   flex justify-center items-center gap-[12px] bg-[#EFEFEF] border border-[#E8E8E8] rounded-xl cursor-pointer"
              onClick={() => navigate.push("/home/insight")}
            >
              <FaChartLine className=" scale-125 text-[#FF7D2C]" />
              <span className={`${text_size.p3} text-[#4B5563] font-[600]`}>
                Insights
              </span>
            </Button>
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      </div>
    </>
  );
}
