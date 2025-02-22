"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

/**
 * Add a user by email. Only by email, so this should usually only be used to create a user in the db when they log in using oath
 */
export const addUserByEmail = async ({ email }: { email: string }) => {
	console.log("in addUserByEmail");
	if (!email) {
		throw new Error("Invalid email");
	}
	const user = {
		email,
	};
	console.log({ user });
	const [createdUser] = await db.insert(usersTable).values(user).returning({
		id: usersTable.id,
		email: usersTable.email,
	});
	console.log({ createdUser });
	if (!createdUser) {
		throw new Error("Failed to create user");
	}
	return { createdUser };
};
