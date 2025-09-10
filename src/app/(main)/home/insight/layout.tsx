import PageMobileHeader from "@/src/components/mobile_headers/pageMobileHeader";
import { ScrollArea, ScrollBar } from "@/src/lib/components/ui/scroll-area";
import { text_size } from "@/src/utils/constants/css.constants";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageMobileHeader />
      <div className="h-screen py-5 px-2 sm:px-4">
        <ScrollArea className="w-full h-full">
          <div className="flex justify-center items-start w-full">
            <div className="w-full max-w-[715px]">{children}</div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </>
  );
}
