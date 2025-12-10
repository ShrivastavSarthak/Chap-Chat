"use client";

import { media } from "@/public";
import { SidebarTrigger, useSidebar } from "@/src/lib/components/ui/sidebar";
import Image from "next/image";

export default function MobileSidebar() {
  const { open, isMobile } = useSidebar();
  return (
    isMobile && (
      <div className="bg-[#F5E7C6] w-full ">
        <div className="flex justify-between items-center w-[80%]">
          <SidebarTrigger className="hover:bg-[#FF6D1F] cursor-pointer scale-150" />
          <Image
            src={media.CCLogoBlue}
            width={200}
            height={100}
            alt="chap-chat Logo"
          />
        </div>
      </div>
    )
  );
}
