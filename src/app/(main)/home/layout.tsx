"use server";
import { AppSidebar } from "@/src/components/sidebar/sideBar";
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
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
        <ReduxHydrate user={res}>{children}</ReduxHydrate>
      </main>
    </SidebarProvider>
  );
}
