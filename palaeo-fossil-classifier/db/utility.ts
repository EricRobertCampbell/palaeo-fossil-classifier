import { SQL, sql } from "drizzle-orm";
import { AnyPgColumn } from "drizzle-orm/pg-core";

export const lower = (email: AnyPgColumn): SQL => {
	return sql`lower(${email})`;
};
