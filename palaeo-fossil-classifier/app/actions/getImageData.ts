"use server";

import { eq } from "drizzle-orm";
import fs from "fs/promises";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";

export const getImageData = async (id: number) => {
	const [image] = await db
		.select()
		.from(imagesTable)
		.where(eq(imagesTable.id, id));
	const filename = image.filename;
	const base64 = await generateBase64FromFile(filename);
	return base64;
};

/**
 * Generates a Base64-encoded string from the file at the given path.
 *
 * @param {string} filePath - The path to the file to encode.
 * @returns {Promise<string>} - A promise that resolves to the Base64-encoded string.
 * @throws {Error} - Throws an error if the file cannot be read.
 */
export async function generateBase64FromFile(filePath) {
	try {
		// Read the file as a buffer
		const fileBuffer = await fs.readFile(filePath);

		// Convert the buffer to a Base64-encoded string
		const base64Data = fileBuffer.toString("base64");

		return base64Data;
	} catch (error) {
		console.error(`Failed to encode file at ${filePath} to Base64:`, error);
		throw new Error(`Unable to encode file: ${error.message}`);
	}
}
