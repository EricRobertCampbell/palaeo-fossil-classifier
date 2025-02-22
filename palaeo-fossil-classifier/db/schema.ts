import { uniqueIndex } from "drizzle-orm/mysql-core";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { lower } from "./utility";

export const usersTable = pgTable(
	"users",
	{
		id: integer().primaryKey().generatedByDefaultAsIdentity(),
		email: varchar({ length: 255 }).notNull().unique(),
		password: varchar({ length: 255 }), // might be null if user signed up with oauth
	},
	(table) => {
		return [uniqueIndex("emailUniqueIndex").on(lower(table.email))];
	}
);

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
