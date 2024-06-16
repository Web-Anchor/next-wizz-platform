CREATE TABLE `components` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`title` text,
	`description` text,
	`slogan` text,
	`type` text,
	`imgUrl` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `components_id_unique` ON `components` (`id`);