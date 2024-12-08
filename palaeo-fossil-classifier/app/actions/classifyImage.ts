"use server";

import { randomUUID } from "crypto";
import { db } from "@/db";
import { classificationTable, usersTable } from "@/db/schema";

interface ClassifyImageInput {
	imageId: number;
	userId: number;
	classification: string;
}
export async function classifyImage({
	imageId,
	userId,
	classification,
}: ClassifyImageInput) {
	console.log({ imageId, userId, classification });
	// const uuid = randomUUID().toString();
	// const user = await db.insert(usersTable).values({
	// 	name: "test" + uuid,
	// 	email: `test${uuid}@example.com`,
	// 	age: 20,
	// 	password: "password",
	// });
	// console.log({ user });
	await db.insert(classificationTable).values({
		image: imageId,
		user: userId,
		classification,
	});
}
