export interface AnswerInterface {
  questionId: string;
  answer: string;
  points: number;
  audioAnswer?: Blob;
}
