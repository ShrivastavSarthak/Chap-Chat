"use client";

import { ReactNode } from "react";

export default function ReduxHydrate({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-full flex-1 overflow-y-auto ">{children}</div>
    </>
  );
}
