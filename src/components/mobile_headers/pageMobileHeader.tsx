"use client";
import Image from "next/image";
import { media } from "@/public";
import { SidebarTrigger, useSidebar } from "@/src/lib/components/ui/sidebar";
import { text_size } from "@/src/utils/constants/css.constants";

export default function PageMobileHeader() {
  const { isMobile } = useSidebar();

  return (
    <>
      {isMobile && (
        <div className=" p-3 flex justify-start gap-3 items-center">
          <div className="shrink-0">
            {" "}
            <SidebarTrigger />
          </div>
          <div>
            <p className={`${text_size.p1} font-[600]`}>Insights</p>
          </div>
        </div>
      )}
    </>
  );
}
