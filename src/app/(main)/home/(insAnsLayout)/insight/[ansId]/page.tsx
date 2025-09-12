"use client";
import { Button } from "@/src/lib/components/ui/button";
import { Card, CardContent } from "@/src/lib/components/ui/card";
import { text_size } from "@/src/utils/constants/css.constants";
import { GoCopy } from "react-icons/go";
import { toast } from "sonner";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/src/lib/components/ui/sidebar";
export default function AggAns({
  params,
}: {
  params: Promise<{ ansId: string }>;
}) {
  const navigate = useRouter();
  const text =
    " Ea sit, proident exercitation laboris et nisi do sed culpa ipsum?Incididunt do ea duis commodo! Reprehenderit cupidatat incididuntadipiscing laborum! Elit eiusmod aliqua dolore exercitation aliquip.Consectetur deserunt labore. Nisi laboris adipiscing commodoconsectetur proident, deserunt ex nostrud? Deserunt proident magna idminim, dolore est aliqua ullamco. Elit deserunt duis, anim voluptate,est non id ipsum proident enim sed. Consequat lorem mollit ullamcoeiusmod? Anim id ullamco consequat reprehenderit. Do amet non,reprehenderit cupidatat culpa incididunt? Do non magna id est, mollitea culpa laboris nostrud dolor, ad! Nostrud?";
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard:", text);
      toast.success("Copied");
    } catch (err) {
      toast.error("Not copied");
    }
  };
  const { isMobile } = useSidebar();

  return (
    <>
      {!isMobile && (
        <h1 className={`${text_size.p1} font-[600] mb-6`}>Insight</h1>
      )}
      <Button
        variant="ghost"
        className="scale-125 cursor-pointer mb-3 ms-2 mt-2"
        onClick={() => navigate.back()}
      >
        <IoMdArrowRoundBack />
      </Button>
      <Card className="w-full  rounded-2xl border border-[#CEEDFD] shadow-[0_7px_15px_0_rgba(25,169,249,0.10)]">
        <CardContent>
          <div className="w-full flex justify-between items-center">
            <p className={`${text_size.p3} mb-2 text-[#A4860A] font-[600]`}>
              You asked this 1 day ago
            </p>
            <Button
              onClick={handleCopy}
              variant="ghost"
              className="cursor-pointer rounded-full"
            >
              <GoCopy />
            </Button>
          </div>
          <p className={`${text_size.p2} mb-2 font-[600]`}>
            Which competitor did you see most often this week - and where?
          </p>
          <p className={`${text_size.p3} underline font-[400] text-[#19A9F9]`}>
            Aggregate answer
          </p>
          <p className={`${text_size.p3} text-[#585858] mt-2 mb-5`}>
            Ea sit, proident exercitation laboris et nisi do sed culpa ipsum?
            Incididunt do ea duis commodo! Reprehenderit cupidatat incididunt
            adipiscing laborum! Elit eiusmod aliqua dolore exercitation aliquip.
            Consectetur deserunt labore. Nisi laboris adipiscing commodo
            consectetur proident, deserunt ex nostrud? Deserunt proident magna
            id minim, dolore est aliqua ullamco. Elit deserunt duis, anim
            voluptate, est non id ipsum proident enim sed. Consequat lorem
            mollit ullamco eiusmod? Anim id ullamco consequat reprehenderit. Do
            amet non, reprehenderit cupidatat culpa incididunt? Do non magna id
            est, mollit ea culpa laboris nostrud dolor, ad! Nostrud?
          </p>
          <div className="w-full mt-3 flex flex-col sm:flex-row justify-start items-start sm:items-end gap-2 sm:gap-3">
            <span className={`${text_size.p3} text-[#585858] font-[400]`}>
              12 responses
            </span>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
