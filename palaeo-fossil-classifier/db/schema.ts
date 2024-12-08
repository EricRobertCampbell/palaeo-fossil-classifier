import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	email: varchar({ length: 255 }).notNull().unique(),
	password: varchar({ length: 255 }).notNull().default("password"),
});

export const imagesTable = pgTable("images", {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	filename: varchar({ length: 255 }).notNull(),
	classification: varchar({ length: 255 }).notNull(),
});

export const classificationTable = pgTable("classification", {
	id: integer().primaryKey().generatedByDefaultAsIdentity(),
	user: integer()
		.notNull()
		.references(() => usersTable.id),
	image: integer()
		.notNull()
		.references(() => imagesTable.id),
	classification: varchar({ length: 255 }).notNull(),
});
