ALTER TABLE `users` ADD `email` text NOT NULL default 'hello@example.com';--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `email_index` ON `users` (`email`);
