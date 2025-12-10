"use client";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../utils/services/store/hook";
import { setUserData } from "../utils/services/store/slice/user";

export default function SessionManager({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user) {
      const userDetails = {
        name: session.user?.name ?? "",
        email: session.user?.email ?? "",
        image: session.user?.image ?? "",
      };
      dispatch(setUserData(userDetails));
    }
  }, [session, dispatch]);
  return children;
}
