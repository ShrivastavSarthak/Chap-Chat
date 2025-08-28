import { Avatar, AvatarImage } from "@/src/lib/components/ui/avatar";
import { Button } from "@/src/lib/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/src/lib/components/ui/dropdown-menu";
import { css_constants } from "@/src/utils/constants/css.constants";

export default function AppSidebarFooter() {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild className="w-full">
        <Button variant="ghost" className="cursor-pointer w-full">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="OneOrg Logo"
              className="w-[40px] h-[40px] rounded-full"
            />
          </Avatar>
          <p className={`${css_constants.p3} font-semibold text-[#324054]`}>
            Mimi Chowdhury
          </p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
