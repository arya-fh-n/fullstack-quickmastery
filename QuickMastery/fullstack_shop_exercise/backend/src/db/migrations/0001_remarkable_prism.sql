CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(500) DEFAULT 'No description has been added yet.',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `products` CHANGE COLUMN `category` `category_id` int;--> statement-breakpoint
ALTER TABLE `products` MODIFY COLUMN `category_id` int NOT NULL;