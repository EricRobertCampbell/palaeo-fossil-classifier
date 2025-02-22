ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL;