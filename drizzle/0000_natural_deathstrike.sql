CREATE TABLE `features` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`feature_name` text,
	`description` text,
	`status` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`template` text,
	`name` text,
	`description` text,
	`logoUrl` text,
	`memo` text,
	`footer` text,
	`header` text,
	`custom_fields` text,
	`line_items` text,
	`amount` text,
	`total` text,
	`currency` text,
	`page_size` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `keys` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`stripe_secret_key` text,
	`stripe_publishable_key` text,
	`restricted_api_key` text,
	`name` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`subject` text,
	`message` text,
	`status` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`clerk_id` text NOT NULL,
	`stripe_sub_id` text,
	`stripe_customer_id` text,
	`first_name` text,
	`last_name` text,
	`email_addresses` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `features_id_unique` ON `features` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `invoices_id_unique` ON `invoices` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `keys_id_unique` ON `keys` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `tickets_id_unique` ON `tickets` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_clerk_id_unique` ON `users` (`clerk_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_stripe_sub_id_unique` ON `users` (`stripe_sub_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_stripe_customer_id_unique` ON `users` (`stripe_customer_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_addresses_unique` ON `users` (`email_addresses`);