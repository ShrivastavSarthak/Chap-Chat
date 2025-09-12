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
import { CreateQuestionMutate } from "@/src/utils/services/api_services/tankstack/questions";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AskOrg({ children }: { children: React.ReactElement }) {
  const [question, setQuestion] = useState<string>("");
  const { mutateAsync: createQuestion } = CreateQuestionMutate();
  const handleSubmit = async () => {
    try {
      const res = await createQuestion(question);
      if (res.status === 200) {
        setQuestion("");
        toast.success("Question Submitted successfully");
      }
    } catch (error) {
      toast.success("Something went wrong. Please try again");
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
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
              type="button"
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
