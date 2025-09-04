"use client";
import { media } from "@/public";
import { useAppDispatch } from "@/src/utils/services/store/hook";
import { resetChats } from "@/src/utils/services/store/slice/chat";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Image from "next/image";
import { Button } from "../../lib/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../lib/components/ui/sidebar";
import AppSidebarFooter from "./sideBarFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/lib/components/ui/accordion";
import { GetChatHistory } from "@/src/utils/services/api_services/tankstack/chat";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/src/lib/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { SetExistingChat } from "@/src/app/(main)/home/action";
import { toast } from "sonner";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export interface ChatHistoryInterface {
  title: string;
  updatedAt: string;
  _id: string;
}

export function AppSidebar() {
  const [chatHistory, setChatHistory] = useState<ChatHistoryInterface[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const { data, isLoading } = GetChatHistory();

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
    <Sidebar collapsible="icon" className="">
      <SidebarContent className="bg-[#EAFAFF] p-5 flex flex-col h-screen">
        <SidebarHeader className="flex flex-row justify-between items-center">
          {" "}
          <Image
            src={media.OneOrgLogoBlue}
            width={250}
            height={150}
            alt="OneOrg Logo"
          />{" "}
        </SidebarHeader>
        <SidebarGroup className="flex flex-col flex-1 overflow-y-scroll no-scrollbar">
          <SidebarGroupContent className="flex-1 flex flex-col mt-5 ">
            <SidebarMenu className="flex-1 flex flex-col ">
              <Button
                variant="ghost"
                className="w-[60%] cursor-pointer flex justify-start items-center border-[1px] border-[#AEECFF] bg-[#D4F5FF] rounded-[30px] text-black hover:bg-[#D4F5FF]"
                onClick={handleNewChat}
              >
                New Chats
              </Button>

              {/* Chat History */}
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
                    {/* ✅ ScrollArea with min-h-0 */}
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
