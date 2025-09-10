import ChatWatcher from "@/src/components/chat/chats_screen/chatWatcher";
import { NewChatScreen } from "@/src/components/chat/chats_screen/newChatScreen";

export default async function NewChatPage() {
  return (
    <>
      <NewChatScreen />
      <ChatWatcher />
    </>
  );
}
