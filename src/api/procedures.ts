import { db } from "@/db";
import { contacts } from "@/db/schema";

export async function health() {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  organisation?: string;
  message: string;
}) {
  const id = crypto.randomUUID();
  await db.insert(contacts).values({ id, ...data });
  return { id };
}
