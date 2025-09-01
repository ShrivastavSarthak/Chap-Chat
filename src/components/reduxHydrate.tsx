"use client";

import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../utils/services/store/hook";
import { setUserData } from "../utils/services/store/slice/user";

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

  return <>{children}</>;
}
