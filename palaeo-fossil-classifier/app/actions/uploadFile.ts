"use server";
import fs from "fs/promises";
import { db } from "@/db";
import { imagesTable } from "@/db/schema";

export async function uploadFile(f: FormData) {
	console.log({ f });
	await fs.mkdir("./uploads", { recursive: true });
	const file = f.get("file") as File;
	console.log({ file });
	const uploadPath = `./uploads/${file.name}`;
	const classification = f.get("classification") as string;
	const fileBuffer = Buffer.from(await file.arrayBuffer());
	await fs.writeFile(uploadPath, fileBuffer);
	await db
		.insert(imagesTable)
		.values({ filename: uploadPath, classification });
}
