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

export function AppSidebar() {
  const dispatch = useAppDispatch();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-[#EAFAFF] p-5 ">
        <SidebarGroup className="h-full">
          <SidebarHeader className="flex flex-row justify-between items-center">
            <Image
              className=""
              src={media.OneOrgLogoBlue}
              width={250}
              height={150}
              alt="OneOrg Logo"
            />
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              <Button
                variant="ghost"
                className="w-[60%] cursor-pointer  flex justify-start items-center border-[1px] border-[#AEECFF] bg-[#D4F5FF] rounded-[30px] text-black hover:bg-[#D4F5FF]"
                onClick={() => dispatch(resetChats())}
              >
                New Chats
              </Button>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Chat history</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="" asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <AppSidebarFooter />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
