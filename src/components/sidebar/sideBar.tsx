import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "../../lib/components/ui/sidebar";
import Image from "next/image";
import { media } from "@/public";
import { Button } from "../../lib/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../../lib/components/ui/avatar";
import { css_constants } from "../../utils/constants/css.constants";
import AppSidebarFooter from "./sideBarFooter";

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
              >
                New Chats
              </Button>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="" asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
