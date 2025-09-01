"use server";
import { AppSidebar } from "@/src/components/sidebar/sideBar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/src/lib/components/ui/sidebar";
import { FetchUserDetails } from "./action";
import ReduxHydrate from "@/src/components/reduxHydrate";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await FetchUserDetails();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen flex flex-col">
        <div className="shrink-0">
          <SidebarTrigger />
        </div>
        <ReduxHydrate user={res}>
          <div className="w-full flex-1 overflow-y-auto ">{children}</div>
        </ReduxHydrate>
      </main>
    </SidebarProvider>
  );
}
