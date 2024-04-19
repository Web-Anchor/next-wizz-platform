CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`emailAddresses` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_emailAddresses_unique` ON `users` (`emailAddresses`);