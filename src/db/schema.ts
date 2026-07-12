import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  image: text("image"),
  handle: text("handle"),
});

export const contacts = sqliteTable("contacts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  organisation: text("organisation"),
  message: text("message").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  attended: integer("attended").default(0),
  archived: integer("archived").default(0),
});
