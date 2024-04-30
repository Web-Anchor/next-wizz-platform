CREATE TABLE `invoices` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`description` text,
	`memo` text,
	`footer` text,
	`amount` text,
	`currency` text,
	`page_size` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invoices_id_unique` ON `invoices` (`id`);