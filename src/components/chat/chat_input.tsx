"use client";
import { CreateChat } from "@/src/app/(main)/home/action";
import { Button } from "@/src/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/src/lib/components/ui/dropdown-menu";
import { Textarea } from "@/src/lib/components/ui/textarea";
import {
  useAppDispatch,
  useAppSelector,
} from "@/src/utils/services/store/hook";
import { addChat } from "@/src/utils/services/store/slice/chat";
import { setChatLoading } from "@/src/utils/services/store/slice/loading";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import { FaArrowUp, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { RiChat3Line } from "react-icons/ri";
import { toast } from "sonner";

function Research() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="flex gap-2 cursor-pointer rounded-4xl border-[1px] border-[#AEECFF] bg-[#D4F5FF] text-black hover:bg-[#19A9F9]"
        >
          <span>Research</span>
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function ChatInput() {
  const [isInput, setIsInput] = useState<string>("");
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
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
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
            <Research />
            <Button
              className="w-10 h-10 cursor-pointer rounded-full"
              variant="ghost"
            >
              <MdAttachFile />
            </Button>
            <Button
              className="w-10 h-10 cursor-pointer rounded-full"
              variant="ghost"
            >
              <RiChat3Line />
            </Button>
          </div>
          <Button
            disabled={isLoading || !isInput}
            className="cursor-pointer  w-10 h-10 flex items-center justify-center rounded-full bg-[#D9D9D9] p-0"
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
