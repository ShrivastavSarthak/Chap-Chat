"use client";
import { CreateChat } from "@/src/app/(main)/home/action";
import { Button } from "@/src/lib/components/ui/button";
import { Textarea } from "@/src/lib/components/ui/textarea";
import { ChatInterface } from "@/src/utils/interface/chatInterface";
import {
  useAppDispatch,
  useAppSelector,
} from "@/src/utils/services/store/hook";
import { addChat } from "@/src/utils/services/store/slice/chat";
import { setChatLoading } from "@/src/utils/services/store/slice/loading";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export default function ChatInput() {
  const [isInput, setIsInput] = useState<string>("");
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.loading.chatLoading);
  const handleChat = async () => {
    try {
      const input: ChatInterface = {
        id: uuidv4(),
        user: isInput,
      };

      dispatch(addChat(input));
      setIsInput("");
      dispatch(setChatLoading(true));
      const { id, res } = await CreateChat(input);
      if (res.status === 200) {
        const response: ChatInterface = {
          id: id,
          assistant: res.data?.choices[0]?.message?.content,
        };
        dispatch(addChat(response));
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
      isInput.trim() !== "" &&
      !isLoading
    ) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <>
      <div
        className="w-full max-w-[715px]  rounded-[32px] border border-[#FF6D1F] bg-[#F5E7C6] 
         py-[24px] px-[20px] mb-6"
      >
        <Textarea
          placeholder="Ask something!"
          className="border-[#FFF] min-h-1 border-[0px] resize-none max-h-[7.5rem] shadow-none text-[#222222] font-semibold"
          rows={1}
          value={isInput}
          onChange={(e) => setIsInput(e.target.value)}
          onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) => onEnter(e)}
        />
        <div className="w-full flex justify-end items-center mt-1">
          <Button
            disabled={isLoading || !isInput}
            className="cursor-pointer  w-10 h-10 mt-2 flex items-center justify-center rounded-full bg-[#222222] text-[#FF6D1F]  hover:text-[#F5E7C6] p-0"
            variant="default"
            onClick={handleChat}
          >
            <FaArrowUp />
          </Button>
        </div>
      </div>
    </>
  );
}
