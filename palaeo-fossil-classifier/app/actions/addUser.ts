"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { hash } from "bcrypt";

export const addUser = async (f: FormData) => {
	console.log("in adduser");
	const userName = f.get("username");
	const email = f.get("email");
	if (!email || typeof email !== "string") {
		throw new Error("Invalid email");
	}
	const password = f.get("password");
	if (!password || typeof password !== "string") {
		throw new Error("Invalid password");
	}
	const hashedPassword = await hash(password, 10);
	const user = {
		email,
		password: hashedPassword,
		username: userName,
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
