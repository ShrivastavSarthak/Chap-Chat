"use client";
import { media } from "@/public";
import { SetExistingChat } from "@/src/app/(main)/home/action";
import { text_size } from "@/src/utils/constants/css.constants";
import { GetChatHistory } from "@/src/utils/services/api_services/tankstack/chat";
import { useAppDispatch } from "@/src/utils/services/store/hook";
import { resetChats } from "@/src/utils/services/store/slice/chat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuMessageCirclePlus } from "react-icons/lu";
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

export function AppSidebar() {
  const [chatHistory, setChatHistory] = useState<any[]>([]);
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
        className={`bg-[#F5E7C6] p-${!isOpen ? 1 : 5} flex flex-col h-screen`}
      >
        <SidebarHeader className="w-full">
          <div
            className={`w-full flex ${
              !isOpen ? "flex-col" : "flex-row"
            } justify-between items-center`}
          >
            <div>
              <Image
                src={isOpen ? media.CCLogoBlue : media.CCShortLogo}
                width={isOpen ? 200 : 200}
                height={isOpen ? 100 : 100}
                alt="chap-chat Logo"
              />
            </div>
            <div className={`${!isOpen && "mt-3"}`}>
              <SidebarTrigger className="hover:bg-[#FF6D1F] cursor-pointer scale-150" />
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
                    ? `${text_size.p3} font-semibold w-[60%] cursor-pointer flex justify-start items-center border-[1px] border-[#222222] bg-[#FF6D1F] rounded-[30px] text-[#222222] hover:bg-[#222222]  hover:text-[#FAF3E1] duration-300 `
                    : "hover:bg-[#FF6D1F] cursor-pointer"
                }`}
                onClick={handleNewChat}
              >
                <LuMessageCirclePlus className="scale-150 shrink-0" />
                {isOpen && "New Chats"}
              </Button>
              {/* NEED IN THE FUTURE */}
              {/* Chat History */}
              {/* {isOpen && (
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
              )} */}
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
