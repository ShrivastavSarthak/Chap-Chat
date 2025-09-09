"use client";
import { CreateChat } from "@/src/app/(main)/home/action";
import { Button } from "@/src/lib/components/ui/button";
import { Textarea } from "@/src/lib/components/ui/textarea";
import {
  useAppDispatch,
  useAppSelector,
} from "@/src/utils/services/store/hook";
import { addChat } from "@/src/utils/services/store/slice/chat";
import { setChatLoading } from "@/src/utils/services/store/slice/loading";
import React, { useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { FaArrowUp } from "react-icons/fa";
import { toast } from "sonner";
import { IoMicOutline } from "react-icons/io5";

export default function ChatInput() {
  const [isInput, setIsInput] = useState<string>("");
  const [deepSearch, setDeepSearch] = useState(false);
  const orgId = useAppSelector((state) => state.user.organizationId);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.chatLoading);
  const handleChat = async () => {
    try {
      const input = isInput;
      dispatch(
        addChat({
          role: "user",
          content: input,
        })
      );
      setIsInput("");
      dispatch(setChatLoading(true));
      const res = await CreateChat({
        message: input,
        orgId,
      });
      if (res.status === 200) {
        dispatch(
          addChat({
            role: "assistant",
            content: res.data?.message,
          })
        );
        dispatch(setChatLoading(false));
      } else {
        dispatch(setChatLoading(false));
      }
      dispatch(setChatLoading(false));
    } catch (error) {
      toast.error("!Something went wrong, please try again");
      dispatch(setChatLoading(false));
    } finally {
      dispatch(setChatLoading(false));
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      e.key === "Enter" &&
      (e.ctrlKey || e.metaKey) &&
      isInput.trim() !== ""
    ) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <>
      <div
        className="w-full max-w-[715px]  rounded-[32px] border border-[#CFECFE] bg-white 
        shadow-[0_170px_48px_0_rgba(25,169,249,0),0_109px_44px_0_rgba(25,169,249,0.01),0_61px_37px_0_rgba(25,169,249,0.05),0_27px_27px_0_rgba(25,169,249,0.09),0_-7px_15px_0_rgba(25,169,249,0.10)] 
        backdrop-blur-[25px] py-[24px] px-[20px] mb-6"
      >
        <Textarea
          placeholder="Ask something!"
          className="border-[#FFF] min-h-1 border-[0px] resize-none max-h-[7.5rem]"
          rows={1}
          value={isInput}
          onChange={(e) => setIsInput(e.target.value)}
          onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onEnter(e)}
        />
        <div className="w-full flex justify-between items-center mt-5">
          <div className="flex gap-3">
            <Button
              onClick={() => setDeepSearch(!deepSearch)}
              variant="default"
              className={`flex gap-2 cursor-pointer rounded-4xl border-[1px] border-[#AEECFF] bg-[#D4F5FF] text-black ${
                deepSearch && "bg-[#19A9F9]"
              } hover:bg-none`}
            >
              <BsGlobe />
              <span>Deep search</span>
            </Button>
          </div>
          <div className="flex  gap-3">
            <Button
              className="w-[40px] h-[40px] cursor-pointer rounded-full"
              variant="ghost"
            >
              <IoMicOutline  className=" scale-125 text-[#6B7280]" />
            </Button>
            <Button
              disabled={isLoading || !isInput}
              className="cursor-pointer  w-10 h-10 flex items-center justify-center rounded-full 
            bg-gradient-to-b from-[#0F295C] to-[#19A9F9]
            disabled:from-[rgba(25,169,249,0.25)] disabled:to-[rgba(15,41,92,0.25)] p-0"
              variant="default"
              onClick={handleChat}
            >
              <FaArrowUp />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
