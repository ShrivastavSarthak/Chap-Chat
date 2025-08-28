import { ScrollArea, ScrollBar } from "@/src/lib/components/ui/scroll-area";
import { css_constants } from "@/src/utils/constants/css.constants";

export default function Suggestions() {
  return (
    <>
      <div className="w-full max-w-[715px]   mb-6">
        <h4 className={`${css_constants.p3} `}>Let’s get you started</h4>

        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex  space-x-4 py-4 w-full snap-x snap-proximity">
            {Array.from({ length: 10 }).map((_, artwork) => (
              <div
                key={artwork}
                className="w-full max-w-[295px] h-[100px] flex-shrink-0 bg-[#EFEFEF] border border-[#E8E8E8] rounded-2xl"
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" hidden />
        </ScrollArea>
      </div>
    </>
  );
}
