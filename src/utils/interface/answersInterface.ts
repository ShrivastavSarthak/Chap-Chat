export interface AnswerInterface {
  askedBy: {
    id: string;
    name: string;
    _id?: string;
  };
  points: number;
  question: string;
  questionId: string;
  type: "TEXT" | "AUDIO";
}
