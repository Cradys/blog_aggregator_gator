ALTER TABLE "feeds" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "feeds" ADD CONSTRAINT "feeds_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");