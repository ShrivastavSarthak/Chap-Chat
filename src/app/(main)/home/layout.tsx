import { AppSidebar } from "@/src/components/sidebar/sideBar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/src/lib/components/ui/sidebar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen h-screen flex flex-col">
        {/* Sticky header */}
        <div className="shrink-0">
          <SidebarTrigger />
        </div>

        {/* Scrollable children */}
        <div className="w-full flex-1 overflow-y-auto ">{children}</div>
      </main>
    </SidebarProvider>
  );
}
