"use server";
import ReduxHydrate from "@/src/components/reduxHydrate";
import { AppSidebar } from "@/src/components/sidebar/sideBar";
import { SidebarProvider } from "@/src/lib/components/ui/sidebar";
import { FetchUserDetails } from "./action";
import MobileSidebar from "@/src/components/sidebar/mobileSidebar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await FetchUserDetails();
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen flex flex-col bg-[#222222]">
        <MobileSidebar />
        <ReduxHydrate>{children}</ReduxHydrate>
      </main>
    </SidebarProvider>
  );
}
