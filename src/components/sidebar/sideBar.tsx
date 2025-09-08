"use client";
import { media } from "@/public";
import { SetExistingChat } from "@/src/app/(main)/home/action";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/lib/components/ui/accordion";
import { ScrollArea, ScrollBar } from "@/src/lib/components/ui/scroll-area";
import { GetChatHistory } from "@/src/utils/services/api_services/tankstack/chat";
import { useAppDispatch } from "@/src/utils/services/store/hook";
import { resetChats } from "@/src/utils/services/store/slice/chat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../../lib/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarTrigger,
  useSidebar,
} from "../../lib/components/ui/sidebar";
import AppSidebarFooter from "./sideBarFooter";
import { LuMessageCirclePlus } from "react-icons/lu";

export interface ChatHistoryInterface {
  title: string;
  updatedAt: string;
  _id: string;
}

export function AppSidebar() {
  const [chatHistory, setChatHistory] = useState<ChatHistoryInterface[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const { data } = GetChatHistory();
  const { open, isMobile } = useSidebar();

  // ✅ Always keep sidebar open if mobile
  const isOpen = isMobile ? true : open;

  useEffect(() => {
    if (data?.status === 200) {
      setChatHistory(data?.data?.chats);
    }
  }, [data]);

  const handleNewChat = async () => {
    await fetch("/api/newChat", { method: "GET" });
    dispatch(resetChats());
    navigate.push("/home/chat");
  };

  const handleChatClick = async (id: string) => {
    try {
      const res = await SetExistingChat(id);
      if (res) {
        navigate.push(`/home/chat/${id}`);
      } else {
        toast.error("Something went wrong please try again");
      }
    } catch (error) {
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent
        className={`bg-[#EAFAFF] p-${!isOpen ? 1 : 5} flex flex-col h-screen`}
      >
        <SidebarHeader className="w-full">
          <div
            className={`w-full flex ${
              !isOpen ? "flex-col" : "flex-row"
            } justify-between items-center`}
          >
            <div>
              <Image
                src={isOpen ? media.OneOrgLogoBlue : media.oneOrg_short_logo}
                width={isOpen ? 200 : 200}
                height={isOpen ? 100 : 100}
                alt="OneOrg Logo"
              />
            </div>
            <div className={`${!isOpen && "mt-2"}`}>
              <SidebarTrigger className="hover:bg-[#D4F5FF] cursor-pointer" />
            </div>
          </div>
        </SidebarHeader>

        <SidebarGroup className="flex flex-col flex-1 overflow-y-scroll no-scrollbar">
          <SidebarGroupContent
            className={`flex-1 flex flex-col ${isOpen && "mt-5"} `}
          >
            <SidebarMenu className="flex-1 flex flex-col ">
              <Button
                variant="ghost"
                className={`${
                  isOpen
                    ? " w-[60%] cursor-pointer flex justify-start items-center border-[1px] border-[#AEECFF] bg-[#D4F5FF] rounded-[30px] text-black hover:bg-[#D4F5FF]"
                    : "hover:bg-[#D4F5FF] cursor-pointer"
                }`}
                onClick={handleNewChat}
              >
                <LuMessageCirclePlus className="text-3xl shrink-0" />
                {isOpen && "New Chats"}
              </Button>

              {/* Chat History */}
              {isOpen && (
                <Accordion
                  type="single"
                  collapsible
                  className="flex-1 flex flex-col "
                >
                  <AccordionItem
                    value="item-1"
                    className="flex flex-col flex-1  min-h-0"
                  >
                    <AccordionTrigger>Chat history</AccordionTrigger>

                    <AccordionContent className="flex-1 flex flex-col ">
                      <ScrollArea className="flex-1 min-h-0 w-full ">
                        <div className="flex flex-col gap-1 w-full ">
                          {chatHistory.map((item) => (
                            <Button
                              variant="link"
                              key={item._id}
                              className=" cursor-pointer justify-start text-left truncate"
                              onClick={() => handleChatClick(item._id)}
                            >
                              {item.title.length > 25
                                ? item.title.slice(0, 25) + "..."
                                : item.title}
                            </Button>
                          ))}
                        </div>
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer stays fixed */}
        <SidebarFooter>
          <AppSidebarFooter />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
