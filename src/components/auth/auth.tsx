"use client";
import { Button } from "@/src/lib/components/ui/button";
import { text_size } from "@/src/utils/constants/css.constants";
import {
  usePathname,
  useRouter
} from "next/navigation";
import { ReactNode } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function AuthPage({ compo }: { compo: ReactNode }) {
  const navigate = useRouter();
  const params = usePathname().split("/")[1];

  return (
    <>
      <div className="flex lg:flex-col flex-row w-[60%]  lg:justify-end justify-between lg:items-stretch items-center mb-[24px]">
        {params === "otp" && (
          <Button variant="ghost" size="icon" onClick={() => navigate.back()}>
            <FaArrowLeftLong className="w-[32px] h-[32px]" size={32} />
          </Button>
        )}
        <h2 className={`${text_size.h2} text-center lg:text-left `}>
          Login{" "}
        </h2>
      </div>
      <div className="flex flex-col items-start rounded-[32px] border border-[#D4D3D3] bg-white gap-6 p-[15px] px-4  md:gap-6 md:p-[15px] md:px-4 lg:w-[580px] lg:p-8 lg:gap-8  w-full">
        {compo}
        <p className={`${text_size.p3} text-center`}>
          By signing up, you agree to{" "}
          <span className="text-[#19A9F9]">Terms and Conditions</span>,{" "}
          <span className="text-[#19A9F9]">Privacy Policy</span> &{" "}
          <span className="text-[#19A9F9]">End User License Agreement</span>
        </p>
      </div>
    </>
  );
}
