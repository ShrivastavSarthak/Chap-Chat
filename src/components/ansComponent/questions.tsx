"use client";

import { Button } from "@/src/lib/components/ui/button";
import { Card } from "@/src/lib/components/ui/card";
import { useSidebar } from "@/src/lib/components/ui/sidebar";
import { text_size } from "@/src/utils/constants/css.constants";
import { FaUser } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import GiveAnswers from "./giveAnswers";
import { useState } from "react";
import { useAppSelector } from "@/src/utils/services/store/hook";

export default function AnswerThis() {
  const { isMobile } = useSidebar();
  const questionsArr = useAppSelector((state) => state.answers);
  const user = useAppSelector((state) => state.user._id);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const handleForward = () => {
    if (currentQuestion < questionsArr.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBackward = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <>
      {!isMobile && (
        <h1 className={`${text_size.p1} font-[600] mb-6`}>Answers this</h1>
      )}
      <Card className="w-full p-5 shadow-none border-0 rounded-[24px]">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start items-center gap-3">
            <FaUser className="text-[#19A9F9]" />
            <span className={`${text_size.p3} text-[#19A9F9] font-[600]`}>
              {questionsArr[currentQuestion].askedBy.id !== user
                ? questionsArr[currentQuestion].askedBy.name
                : "You"}{" "}
              asked this
            </span>
          </div>
          <div className="flex ">
            <Button
              onClick={handleBackward}
              disabled={!(currentQuestion > 0)}
              variant="ghost"
              className="cursor-pointer"
            >
              <IoIosArrowBack className="scale-125" />
            </Button>
            <Button
              onClick={handleForward}
              disabled={!(currentQuestion < questionsArr.length - 1)}
              variant="ghost"
              className="cursor-pointer"
            >
              <IoChevronForward className="scale-125" />
            </Button>
          </div>
        </div>
        <h4 className={`${text_size.p2} font-[600] text-[#0F295C] my-1`}>
          {questionsArr[currentQuestion].question}
        </h4>
        <h3 className={`${text_size.p2} font-[600] text-[#19A9F9]`}>
          Question {currentQuestion + 1}/{questionsArr.length}
        </h3>
      </Card>
      <h3 className={`${text_size.p3} font-[600] text-[#585858] mb-4 mt-8`}>
        Your answer
      </h3>
      <GiveAnswers />
    </>
  );
}
