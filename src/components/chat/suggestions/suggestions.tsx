"use client";
import { text_size } from "@/src/utils/constants/css.constants";
import { useAppSelector } from "@/src/utils/services/store/hook";

export default function Suggestions() {
  const chat = useAppSelector((state) => state.chats);
  return (
    <>
      <div className="w-full max-w-[715px]   mb-6">
        {chat.length === 0 && (
          <h4 className={`${text_size.p3} mb-[0.4rem] text-[#FF6D1F] `}>
            Let’s get you started
          </h4>
        )}
      </div>
    </>
  );
}
