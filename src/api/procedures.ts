import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/express";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { getRpcAuth } from "@/lib/rpc-context";

async function getAdminUser() {
  const auth = getRpcAuth();
  if (!auth?.userId) throw new Error("Unauthorized");
  const user = await clerkClient.users.getUser(auth.userId);
  if (user.publicMetadata?.role !== "admin") throw new Error("Forbidden");
  return user;
}

export async function health() {
  return { status: "ok", timestamp: new Date().toISOString() };
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

export async function adminGetContacts() {
  await getAdminUser();
  return db.select().from(contacts).orderBy(contacts.createdAt);
}

export async function adminDeleteContact(id: string) {
  await getAdminUser();
  await db.delete(contacts).where(eq(contacts.id, id));
  return { deleted: true };
}
