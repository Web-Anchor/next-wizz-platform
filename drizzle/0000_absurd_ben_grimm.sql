CREATE TABLE `stripe_keys` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`stripe_secret_key` text,
	`stripe_publishable_key` text,
	`restricted_api_key` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`clerk_id` text NOT NULL,
	`stripe_id` text,
	`first_name` text,
	`last_name` text,
	`email_addresses` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_clerk_id_unique` ON `users` (`clerk_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_stripe_id_unique` ON `users` (`stripe_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_addresses_unique` ON `users` (`email_addresses`);