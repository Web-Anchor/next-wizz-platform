CREATE TABLE `ratings` (
	`id` text PRIMARY KEY NOT NULL,
	`clerk_id` text,
	`rating` text,
	`comments` text,
	`first_name` text,
	`last_name` text,
	`image_url` text,
	`platform` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
ALTER TABLE `tickets` ADD `clerk_id` text;--> statement-breakpoint
ALTER TABLE `tickets` ADD `type` text;--> statement-breakpoint
CREATE UNIQUE INDEX `ratings_id_unique` ON `ratings` (`id`);