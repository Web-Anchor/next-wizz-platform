CREATE TABLE `stripe_keys` (
	`id` text PRIMARY KEY DEFAULT DEFAULT_VALUE NOT NULL,
	`user_id` text NOT NULL,
	`stripe_secret_key` text,
	`stripe_publishable_key` text,
	`restricted_api_key` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_keys_id_unique` ON `stripe_keys` (`id`);