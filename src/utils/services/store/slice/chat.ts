import { ChatInterface } from "@/src/utils/interface/chatInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: ChatInterface[] = [];

export const ChatSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatInterface>) => {
      const newChat: ChatInterface = {
        ...action.payload,
      };

      const findIndex = state.findIndex((item) => item.id === newChat.id);

      if (findIndex !== -1 && newChat.assistant) {
        const answer = newChat.assistant;
        state[findIndex] = {
          ...state[findIndex],
          assistant: [
            ...(state[findIndex].assistant || []),
            ...(Array.isArray(answer) ? answer : [answer]),
          ],
        };
      } else {
        state.push(newChat);
      }
    },
    resetChats: () => {
      return [];
    },
    setExistingChat: (_, action: PayloadAction<ChatInterface[]>) => {
      const existingChat = action.payload;
      return existingChat;
    },
  },
});

export const { addChat, resetChats, setExistingChat } = ChatSlice.actions;
export default ChatSlice.reducer;
