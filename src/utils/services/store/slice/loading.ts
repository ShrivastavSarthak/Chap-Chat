import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  chatLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setChatLoading: (state, action: PayloadAction<boolean>) => {
      const isLoading = action.payload;
      state.chatLoading = isLoading;
    },
  },
});

export const { setChatLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
