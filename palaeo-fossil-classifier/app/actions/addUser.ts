"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const addUser = async (f: FormData) => {
	console.log("in adduser");
	const user = {
		email: f.get("email"),
		password: f.get("password"),
	};
	console.log({ user });
	const createdUser = await db.insert(usersTable).values(user);
	console.log({ createdUser });
	return "done";
};
