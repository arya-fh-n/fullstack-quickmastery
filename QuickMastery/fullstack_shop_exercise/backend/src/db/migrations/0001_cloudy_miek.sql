CREATE TABLE `product_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` int NOT NULL,
	`description` varchar(500) NOT NULL,
	`manufacturer` varchar(255) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `product_details` ADD CONSTRAINT `product_details_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE cascade ON UPDATE cascade;