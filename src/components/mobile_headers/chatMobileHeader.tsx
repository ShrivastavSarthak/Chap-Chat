"use client";
import Image from "next/image";
import { media } from "@/public";
import { SidebarTrigger, useSidebar } from "@/src/lib/components/ui/sidebar";

export default function ChatMobileHeader() {
  const { isMobile } = useSidebar();

  return (
    <>
      {isMobile && (
        <div className="w-[80%] p-3 flex justify-between items-center">
          <div className="shrink-0">
            {" "}
            <SidebarTrigger />
          </div>
          <div>
            <Image
              src={media.OneOrgLogoBlue}
              width={200}
              height={100}
              alt="OneOrg Logo"
            />
          </div>
        </div>
      )}
    </>
  );
}
