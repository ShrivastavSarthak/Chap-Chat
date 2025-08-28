import { ScrollArea } from "@/src/lib/components/ui/scroll-area";
import { ChatInterface } from "../chatScreen";
import { css_constants } from "@/src/utils/constants/css.constants";

const DummyChats: ChatInterface[] = [
  { query: "Hello!", response: "Hi there 👋 How can I help you?" },
  {
    query: "Tell me a joke.",
    response: "Why don’t skeletons fight each other? They don’t have the guts.",
  },
  { query: "What's 2 + 2?", response: "The answer is 4." },
  {
    query:
      "Id dolore laboris, labore proident, sit do nisi consectetur mollit eiusmod et est! Ut laborum et incididunt est culpa? Irure aliquip, consequat labore incididunt et magna anim reprehenderit qui voluptate.Irure amet tempor adipiscing exercitation veniam. Non aute et sed minim qui! Et reprehenderit cupidatat, id non ut enim laboris? Ullamco et aute ut sit ex! Laboris ea duis id.Consectetur sunt laborum mollit, deserunt non magna id ut duis. Id adipiscing, eiusmod incididunt reprehenderit mollit, labore irure officia voluptate proident enim? Id voluptate proident elit exercitation quis laborum, do!",
    response: "France won the 2018 FIFA World Cup.",
  },
  { query: "Goodbye!", response: null }, // response not available yet
];
export default function NewChatsScreen({ chats }: { chats: ChatInterface[] }) {
  return (
    <>
      <div className="w-full h-full flex justify-center items-start overflow-y-auto">
        <div className="w-full max-w-[715px]  h-full flex  flex-col items-center">
          {chats.map((chat, i) => (
            <div key={i} className="w-full">
              {chat.query && (
                <div className="w-full flex justify-end my-6 ">
                  <span
                    className={`bg-[#19A9F9] rounded-b-2xl rounded-l-2xl p-4 text-white ${css_constants.p2} max-w-[90%]`}
                  >
                    {chat.query}
                  </span>
                </div>
              )}
              {chat.response && (
                <div className="w-full flex justify-start">{chat.response}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
