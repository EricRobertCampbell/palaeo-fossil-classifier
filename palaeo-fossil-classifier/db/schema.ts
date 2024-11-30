import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	name: varchar(255).notNull(),
	age: integer().notNull(),
	email: varchar(255).notNull().unique(),
});
