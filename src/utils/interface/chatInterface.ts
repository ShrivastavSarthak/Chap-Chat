export interface ChatInterface {
  role: "assistant" | "user";
  content: string;
  _id?: string;
}
