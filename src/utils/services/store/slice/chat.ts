import { ChatInterface } from "@/src/utils/interface/chatInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState: ChatInterface[] = [];

export const ChatSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatInterface>) => {
      const newChat: ChatInterface = {
        ...action.payload,
        _id: uuidv4(),
      };

      state.push(newChat);
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
