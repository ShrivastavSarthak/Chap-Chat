"use client";
import { Avatar, AvatarImage } from "@/src/lib/components/ui/avatar";
import { Button } from "@/src/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/lib/components/ui/dropdown-menu";
import { text_size } from "@/src/utils/constants/css.constants";
import { useAppSelector } from "@/src/utils/services/store/hook";
import { ProfileDialog } from "./dialogs/profile_dialogs";
import SignoutDialog from "./dialogs/signout_dialogs";
import { useSidebar } from "@/src/lib/components/ui/sidebar";

export default function AppSidebarFooter() {
  const userName = useAppSelector((state) => state.user.name);
  const { open, isMobile } = useSidebar();

  // ✅ Always show expanded state on mobile
  const isOpen = isMobile ? true : open;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full">
        <Button variant="ghost" className="cursor-pointer w-full">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
              className="w-[40px] h-[40px] rounded-full"
            />
          </Avatar>
          {isOpen && (
            <p className={`${text_size.p3} font-semibold text-[#324054]`}>
              {userName}
            </p>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <ProfileDialog />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <SignoutDialog />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
