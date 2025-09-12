import { Button } from "@/src/lib/components/ui/button";
import { Card } from "@/src/lib/components/ui/card";
import { Textarea } from "@/src/lib/components/ui/textarea";
import { button_color, text_size } from "@/src/utils/constants/css.constants";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { IoMic } from "react-icons/io5";

export default function GiveAnswers() {
  const [answer, setAnswer] = useState<string>("");

  return (
    <>
      <Card className="w-full p-5 shadow-none rounded-[24px]">
        <Textarea
          placeholder="Type your thoughts here..."
          onChange={(e) => setAnswer(e.target.value)}
          className={`border-[#FFF] min-h-1 border-[0px] resize-none shadow-none h-[7.5rem]`}
        />
        <div className="flex justify-end w-full">
          <Button variant="ghost" className="cursor-pointer">
            <IoMic className="scale-125 text-[#19A9F9]" />
          </Button>
        </div>
      </Card>
      <div className="flex justify-between items-center mt-3">
        <Button variant="ghost">
          <LuUpload className="scale-125" />
          <span className={`${text_size.p3}`}>Upload file</span>
        </Button>
        <p
          className={`${text_size.p3} ${
            answer.length < 20 || answer.length > 500
              ? "text-[#FF0E0E]"
              : "text-[#979797]"
          }`}
        >
          {answer.length}/500
        </p>
      </div>
      <div className="justify-end flex w-full">
        <Button
          disabled={answer.length < 20 || answer.length > 500}
          className={`${button_color.linerGradient} mt-8  cursor-pointer`}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
