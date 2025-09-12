import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slice/user";
import { loadingSlice } from "./slice/loading";
import { ChatSlice } from "./slice/chat";
import { AnswersSlice } from "./slice/answer";

export const reducer = combineReducers({
  user: userSlice.reducer,
  loading: loadingSlice.reducer,
  chats: ChatSlice.reducer,
  answers: AnswersSlice.reducer,
});
