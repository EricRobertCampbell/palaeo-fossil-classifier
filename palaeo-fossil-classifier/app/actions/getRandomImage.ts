"use server";

import { sql } from "drizzle-orm";
import { imagesTable } from "@/db/schema";
import { db } from "@/db";

export async function getRandomImage() {
	console.log("getRandomImage");
	const [randomImage] = await db
		.select()
		.from(imagesTable)
		.orderBy(sql`RANDOM()`)
		.limit(1);
	console.log("randomImage", randomImage);
	return randomImage;
}
