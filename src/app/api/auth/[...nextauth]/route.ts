import { handlers } from "@/auth";

// 👇 must be here, not in auth.ts
export const runtime = "nodejs";

export const { GET, POST } = handlers;
