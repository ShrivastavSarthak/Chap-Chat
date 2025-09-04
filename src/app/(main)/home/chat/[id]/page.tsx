import ChatScreen from "@/src/components/chat/chatScreen";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="w-full h-full  overflow-hidden">
      <ChatScreen chatId={id} />
    </div>
  );
}
