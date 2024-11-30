"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

interface AddUserInput {
	name: string;
	age: number;
	email: string;
}
export const addUsers = async (user: AddUserInput) => {
	const createdUser = await db.insert(usersTable).values(user);
	return { ...createdUser };
};
