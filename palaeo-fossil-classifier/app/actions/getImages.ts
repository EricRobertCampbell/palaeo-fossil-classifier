"use server";

import { db } from "@/db";
import { imagesTable } from "@/db/schema";

export const getImages = async () => {
	const images = await db.select().from(imagesTable);
	return images;
};
