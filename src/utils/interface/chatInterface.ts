export interface ChatInterface {
  role: "assistant" | "user";
  content: string;
  _id?: string;
}

export interface ChatHistoryInterface {
  title: string;
  updatedAt: string;
  _id: string;
}