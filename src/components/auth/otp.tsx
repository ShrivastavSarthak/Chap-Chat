"use client";
import { verifyOtp } from "@/src/app/(main)/(login)/action";
import { Button } from "@/src/lib/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/src/lib/components/ui/input-otp";
import { text_size } from "@/src/utils/constants/css.constants";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Otp() {
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useRouter();
  const handleSendOtp = async () => {
    try {
      setIsLoading(true);
      const result = await verifyOtp(otpValue);
      if (result.status === 200) {
        toast.success(result.data?.message || "Otp verified successfully");
        console.log("result", result.data?.data?.user?._id);

        navigate.push("/home");
      } else {
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong, Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <p className={`text-[#696D6E] ${text_size.p3} font-[400] mb-5`}>
          Enter OTP via Email ID
        </p>
        <InputOTP
          maxLength={4}
          minLength={4}
          value={otpValue}
          onChange={(value) => setOtpValue(value)}
          pattern={REGEXP_ONLY_DIGITS}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSendOtp();
            }
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot
              className="border-[1px] rounded-[12px] w-[64px] h-[64px]"
              index={0}
            />
            <InputOTPSeparator className="invisible" />
            <InputOTPSlot
              className="border-[1px] rounded-[12px] w-[64px] h-[64px]"
              index={1}
            />
            <InputOTPSeparator className="invisible" />
            <InputOTPSlot
              className="border-[1px] rounded-[12px] w-[64px] h-[64px]"
              index={2}
            />
            <InputOTPSeparator className="invisible" />
            <InputOTPSlot
              className="border-[1px] rounded-[12px] w-[64px] h-[64px]"
              index={3}
            />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Button
        size="lg"
        type="button"
        onClick={handleSendOtp}
        disabled={otpValue.length !== 4 || isLoading}
        className={`
              w-full 
              flex justify-center items-center gap-[9.156px]
              self-stretch
              h-[54px] px-[24px] py-[14px]
              rounded-[12px] 
              bg-gradient-to-b from-[#0F295C] to-[#19A9F9]
              disabled:from-[rgba(25,169,249,0.25)] disabled:to-[rgba(15,41,92,0.25)]
            `}
      >
        <p className={`${text_size.p2} text-[#fff]`}>Submit OTP</p>
      </Button>
    </>
  );
}
