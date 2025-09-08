"use client";

import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../utils/services/store/hook";
import { setUserData } from "../utils/services/store/slice/user";
import { SidebarTrigger, useSidebar } from "../lib/components/ui/sidebar";
import Image from "next/image";
import { media } from "@/public";

export default function ReduxHydrate({
  user,
  children,
}: {
  user: any;
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUserData(user?.data?.data));
  }, [user, dispatch]);

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
      <div className="w-full flex-1 overflow-y-auto ">{children}</div>
    </>
  );
}
