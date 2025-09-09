"use client";
import { Button } from "@/src/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/lib/components/ui/dialog";
import { Textarea } from "@/src/lib/components/ui/textarea";
import { button_color, text_size } from "@/src/utils/constants/css.constants";
import { useState } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { toast } from "sonner";

export default function AskOrg() {
  const [question, setQuestion] = useState<string>("");

  function handleSubmit() {
    console.log("====================================");
    console.log("submit");
    console.log("====================================");
    setQuestion("");
    toast.success("Question Submitted successfully");
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className=" md:px-[20px] px-[16px] md:py-[16px] py-[12px]   flex justify-center items-center gap-[12px] bg-[#EFEFEF] border border-[#E8E8E8] rounded-xl cursor-pointer "
          >
            <HiOutlineQuestionMarkCircle className=" scale-125 text-[#3186C3]" />
            <span className={`${text_size.p3} text-[#4B5563] font-[600]`}>
              Ask Org
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className={`${text_size.p2} font-[600] text-left`}>
              Question for the org
            </DialogTitle>
          </DialogHeader>
          <hr />
          <Textarea
            placeholder="Type your question here..."
            value={question}
            className={`min-h-1  resize-none h-[7.5rem] ${
              question.length < 20 ? "border-[#FF0E0E]" : "border-[#059669]"
            }`}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
          />
          {question.length < 20 ? (
            <p className={`${text_size.p3} text-[#FF0E0E]`}>
              Min. 20 characters{" "}
            </p>
          ) : (
            <p className={`${text_size.p3} text-[#059669]`}>
              {question.length} characters{" "}
            </p>
          )}
          <DialogFooter className="flex justify-end items-end gap-3">
            <Button
              variant="default"
              disabled={question.length < 20}
              className={`${button_color.linerGradient} cursor-pointer`}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
