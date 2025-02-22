"use server";

import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { db } from "@/db";
import { lower } from "@/db/utility";

export async function getUserByEmail(email: string) {
	console.log("getting user by email", email);
	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(lower(usersTable.email), email.toLowerCase()))
		.limit(1);
	return user;
}
