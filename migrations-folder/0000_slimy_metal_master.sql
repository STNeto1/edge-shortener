CREATE TABLE `short_links` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`slug` varchar(20) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()));
