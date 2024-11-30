"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const getUsers = async () => {
	const users = await db.select().from(usersTable);
	return users;
};
