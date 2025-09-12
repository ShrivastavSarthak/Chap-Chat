import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnswerInterface } from "./../../../interface/answersInterface";

const initialState: AnswerInterface[] = [];

export const AnswersSlice = createSlice({
  name: "Answers",
  initialState,
  reducers: {
    fetchAnswers: (_, action: PayloadAction<AnswerInterface[]>) => {
      const answersList = action.payload;
      return answersList;
    },
  },
});

export const { fetchAnswers } = AnswersSlice.actions;

export default AnswersSlice.reducer;
