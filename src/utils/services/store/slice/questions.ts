import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionInterface } from "../../../interface/questionInterface";

const initialState: QuestionInterface[] = [];

export const QuestionsSlice = createSlice({
  name: "Answers",
  initialState,
  reducers: {
    fetchQuestions: (_, action: PayloadAction<QuestionInterface[]>) => {
      const questionsList = action.payload;
      return questionsList;
    },
    addQuestion: (state, action: PayloadAction<QuestionInterface>) => {
      const newQuestionsArray = [...state, { ...action.payload }];
      return newQuestionsArray;
    },
    removeQuestionOnAnswer: (state, action: PayloadAction<string>) => {
      const filterQuestions = state.filter(
        (ques) => ques.questionId !== action.payload
      );
      return filterQuestions;
    },
  },
});

export const { fetchQuestions, addQuestion, removeQuestionOnAnswer } =
  QuestionsSlice.actions;

export default QuestionsSlice.reducer;
