export const auth_url = {};

export const user_url = {
  userDetails: "/user/fetch/user/{0}",
};

export const chats_url = {
  createChat: "/chat/send-message-to-assistant",
  allChatHistory: "/chat/all-chats",
  chatHistory: "/chat/history/{0}",
};

export const questions_url = {
  createQuestion: "/org_question/create",
};

export const insights_url = {
  getAllInsights: "/org_question/get-insights-questions",
  getInsightsByQuestions: "",
};

export const answers_url={
  getAllAnswers:"/org_question/remaining-questions/get"
}
