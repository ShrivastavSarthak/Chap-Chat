import { text_size } from "@/src/utils/constants/css.constants";
import { useAppSelector } from "@/src/utils/services/store/hook";
import { useEffect, useRef } from "react";
import { ThreeDot } from "react-loading-indicators";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatsScreen() {
  const isChatLoading = useAppSelector((state) => state.loading.chatLoading);
  const chats = useAppSelector((state) => state.chats);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, isChatLoading]);

  return (
    <>
      <div className="w-full h-full flex justify-center items-start overflow-y-auto mb-2">
        <div className="w-full max-w-[715px]  h-full flex  flex-col items-center">
          {chats.map((chat, i) => (
            <div key={chat.id} className="w-full">
              {chat.user && (
                <div className="w-full flex justify-end my-2 ">
                  <span
                    className={`bg-[#FF6D1F] rounded-b-2xl rounded-l-2xl p-2 text-[#FAF3E1] ${text_size.p3} max-w-[90%]`}
                  >
                    {chat.user}
                  </span>
                </div>
              )}
              {chat.assistant &&
                chat.assistant.map((chat, index) => (
                  <div key={index} className="w-full flex justify-start">
                    <div className="w-full flex flex-col overflow-x-auto text-[#FF6D1F] font-semibold">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {chat}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
              {i === chats.length - 1 && isChatLoading && (
                <div className="w-full flex justify-start p-2">
                  <ThreeDot
                    variant="pulsate"
                    easing="ease-in-out"
                    color="#FF6D1F"
                    size="small"
                    text=""
                  />
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>
      </div>
    </>
  );
}
