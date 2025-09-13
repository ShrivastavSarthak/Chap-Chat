import { Button } from "@/src/lib/components/ui/button";
import { Card } from "@/src/lib/components/ui/card";
import { Textarea } from "@/src/lib/components/ui/textarea";
import { answers_url } from "@/src/utils/constants/apiConstants/api.url";
import { button_color, text_size } from "@/src/utils/constants/css.constants";
import {
  SendAnswerMutation,
  SendAudioAnswerMutation,
} from "@/src/utils/services/api_services/tankstack/answers";
import { useAppDispatch } from "@/src/utils/services/store/hook";
import { removeQuestionOnAnswer } from "@/src/utils/services/store/slice/questions";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { toast } from "sonner";
import Audio from "./audio_manage/audio";
import { FourSquare } from "react-loading-indicators";

export default function GiveAnswers({
  questionId,
}: {
  questionId: string | null;
}) {
  const [answer, setAnswer] = useState<string>("");
  const [isAudio, setIsAudio] = useState<Blob | null>(null);
  const dispatch = useAppDispatch();
  const { mutateAsync: sendQuestion, isPending: answerPending } =
    SendAnswerMutation();
  const { mutateAsync: sendAudioQuestion, isPending: audioAnswerPending } =
    SendAudioAnswerMutation();

  const handleAnswerSubmit = async () => {
    try {
      // NEED TO REFACTOR THIS LOGIC THAT ERROR SHOULD BE SHOWN IF API WILL NOT BE SUCCESSFULLY HIT
      if (questionId) {
        let res;
        if (!isAudio) {
          res = await sendQuestion({
            answer: answer,
            questionId: questionId,
            points: 5,
          });
          if (res.status === 200) {
            dispatch(removeQuestionOnAnswer(questionId));
            setAnswer("");
            toast.success("Answer send Successfully. 5 points added");
          }
        } else {
          const formData = new FormData();
          formData.append("questionId", questionId);
          formData.append("points", "5");
          formData.append("answer", answer);
          formData.append("file", isAudio, "answer.webm");

          res = await sendAudioQuestion(formData);
          if (res.status === 200) {
            dispatch(removeQuestionOnAnswer(questionId));
            setAnswer("");
            toast.success("Answer send Successfully. 5 points added");
          }
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again");
    }
  };

  const handleAudio = (audio: Blob) => {
    setIsAudio(audio);
  };

  return (
    <>
      <Card className="w-full p-5 shadow-none rounded-[24px]">
        <Textarea
          value={answer}
          placeholder="Type your thoughts here..."
          onChange={(e) => setAnswer(e.target.value)}
          className={`border-[#FFF] min-h-1 border-[0px] resize-none shadow-none h-[7.5rem]`}
        />
        <Audio onAudioReady={handleAudio} />
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
        {answerPending || audioAnswerPending ? (
          <FourSquare color="#19A9F9" size="small" text="" textColor="" />
        ) : (
          <Button
            onClick={handleAnswerSubmit}
            disabled={!isAudio && (answer.length < 20 || answer.length > 500)}
            className={`${button_color.linerGradient} mt-8 cursor-pointer`}
          >
            Submit
          </Button>
        )}
      </div>
    </>
  );
}
