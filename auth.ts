import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import client from "./src/utils/services/db_service/db.service";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { authConfig } from "./src/app/auth.config";
export const runtime = "nodejs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
