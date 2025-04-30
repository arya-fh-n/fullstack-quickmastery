import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  int,
  float,
  serial,
  varchar,
  mysqlTable as mySqlTable,
  timestamp,
  foreignKey,
} from "drizzle-orm/mysql-core";

// Define database schemas
export const productsTable = mySqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: float("price").notNull().default(0.0),
  category: varchar("category", { length: 255 }).notNull().default("N/A"),
  stock: int("stock").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const productDetailsTable = mySqlTable(
  "product_details",
  {
    id: serial("id").primaryKey(),
    productId: int("product_id").notNull(),
    description: varchar("description", { length: 500 }).notNull(),
    manufacturer: varchar("manufacturer", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
  },
  (table) => [
    foreignKey({
      name: "product_details_product_id_fkey",
      columns: [table.productId],
      foreignColumns: [productsTable.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ]
);

export type Product = InferSelectModel<typeof productsTable>;
export type NewProduct = InferInsertModel<typeof productsTable>;

export type ProductDetail = InferSelectModel<typeof productDetailsTable>;
export type NewProductDetail = InferInsertModel<typeof productDetailsTable>;
