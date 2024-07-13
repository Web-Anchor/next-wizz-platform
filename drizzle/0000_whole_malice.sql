CREATE TABLE `components` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`title` text,
	`description` text,
	`slogan` text,
	`type` text,
	`imgUrl` text,
	`link` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `features` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`feature_name` text,
	`description` text,
	`comments` text,
	`priority` text,
	`status` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `keys` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`stripe_secret_key` text,
	`stripe_publishable_key` text,
	`restricted_api_key` text,
	`name` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
CREATE TABLE `templates` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`template` text,
	`name` text,
	`description` text,
	`imgUrl` text,
	`memo` text,
	`footer` text,
	`header` text,
	`custom_fields` text,
	`line_items` text,
	`amount` text,
	`total` text,
	`currency` text,
	`company_name` text,
	`invoice_number` text,
	`company_address` text,
	`page_size` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`clerk_id` text,
	`subject` text,
	`type` text,
	`email` text,
	`message` text,
	`comments` text,
	`priority` text,
	`status` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP,
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
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`emails_send_count` text,
	`last_email_send_date` text,
	`invoice_send_count` text,
	`last_invoice_send_date` text,
	`type` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `components_id_unique` ON `components` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `features_id_unique` ON `features` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `keys_id_unique` ON `keys` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `ratings_id_unique` ON `ratings` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `templates_id_unique` ON `templates` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `tickets_id_unique` ON `tickets` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_clerk_id_unique` ON `users` (`clerk_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_stripe_sub_id_unique` ON `users` (`stripe_sub_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_stripe_customer_id_unique` ON `users` (`stripe_customer_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_addresses_unique` ON `users` (`email_addresses`);