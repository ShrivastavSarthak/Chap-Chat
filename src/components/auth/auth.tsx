import { css_constants } from "@/src/utils/constants/css.constants";
import { Button } from "@/src/lib/components/ui/button";
import { Input } from "@/src/lib/components/ui/input";
import { HiOutlineMail } from "react-icons/hi";
export default function AuthPage() {
  return (
    <>
      <div className=" relative w-full border-[2px] rounded-[12px] border-[#939393] bg-[#fff] flex p-[18px] justify-start items-center gap-1.5">
        <div className="absolute top-[-15px] px-2 bg-[#fff]">
          <p className={`${css_constants.p2} text-[#585858] `}>Email</p>
        </div>
        <HiOutlineMail size={50} className="text-[#585858]" />
        <Input placeholder="Enter your email ID" />
      </div>
      <Button
        size="lg"
        disabled
        className={`
        w-full 
        flex justify-center items-center gap-[9.156px]
        self-stretch
        h-[64.089px] px-[34.333px] py-[17.167px]
        rounded-[12px] 
        bg-gradient-to-b from-[#0F295C] to-[#19A9F9]
        disabled:from-[rgba(25,169,249,0.25)] disabled:to-[rgba(15,41,92,0.25)]
        `}
      >
        Next
      </Button>
      <p className={`${css_constants.p3} text-center`}>
        By signing up, you agree to{" "}
        <span className="text-[#19A9F9]">Terms and Conditions</span>,{" "}
        <span className="text-[#19A9F9]">Privacy Policy</span> &{" "}
        <span className="text-[#19A9F9]">End User License Agreement</span>
      </p>
    </>
  );
}
