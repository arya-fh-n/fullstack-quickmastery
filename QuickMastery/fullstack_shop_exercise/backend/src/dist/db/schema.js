import { int, float, serial, varchar, mysqlTable as mySqlTable, timestamp, } from "drizzle-orm/mysql-core";
// Define database schemas
export const productsTable = mySqlTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: float("price").notNull().default(0.0),
    category: varchar("category", { length: 255 }).notNull().default("N/A"),
    stock: int("stock").notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});
