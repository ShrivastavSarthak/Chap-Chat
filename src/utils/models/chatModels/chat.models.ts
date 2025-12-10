import mongoose, { models } from "mongoose";

const SingleChatContent = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user: {
      type: String,
    },
    assistant: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MainChatContent = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    chatId: {
      type: String,
      required: true,
      unique: true,
    },
    messages: [SingleChatContent],
  },
  {
    timestamps: true,
  }
);

const Chats = new mongoose.Schema(
  {
    userId: {
      ref: "users",
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    chats: [MainChatContent],
  },
  {
    timestamps: true,
  }
);

export default models.UserChats || mongoose.model("UserChats", Chats);
