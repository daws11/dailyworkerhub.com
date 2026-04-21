import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
});

// bcrypt hash format: $2a$12$... or $2b$... or $2y$... followed by 53 chars
const BCRYPT_HASH_REGEX = /^\$(2[aby])\$(\d{2})\$[./A-Za-z0-9]{53}$/;

export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    hashedPassword: true,
  })
  .extend({
    hashedPassword: z.string().regex(BCRYPT_HASH_REGEX, {
      message: "Invalid password hash format. Expected bcrypt format like $2a$12$...",
    }),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
