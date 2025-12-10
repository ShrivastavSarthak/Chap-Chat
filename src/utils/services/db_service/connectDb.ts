import client from "./db.service";

export async function connectDB() {
  if (!client.db()) {
    await client.connect();
    console.log("✅ MongoDB Connected");
  }
  return client.db();
}
