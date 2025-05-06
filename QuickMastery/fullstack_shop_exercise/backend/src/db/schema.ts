import { relations } from "drizzle-orm";
import {
  int,
  float,
  serial,
  varchar,
  boolean,
  mysqlTable as mySqlTable,
  timestamp,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

// Define database schemas
export const productsTable = mySqlTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: float("price").notNull().default(0.0),
  category: int("category_id").notNull().references(() => categoriesTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  stock: int("stock").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const productsRelations = relations(productsTable, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.category],
    references: [categoriesTable.id],
  }),
  cart: many(cartTable),
}));

export const categoriesTable = mySqlTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }).default(
    "No description has been added yet."
  ),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  products: many(productsTable),
}));

export const cartTable = mySqlTable("cart", {
  id: serial("id").primaryKey(),
  userId: int("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  productId: int("product_id").notNull().references(() => productsTable.id, { onDelete: "cascade", onUpdate: "cascade" }),
  quantity: int("quantity").default(1),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const rolesEnum = mysqlEnum("roles", ["admin", "cashier"]);

export const usersTable = mySqlTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  fullname: varchar("fullname", { length: 255 }).notNull(),
  phone_number: varchar("phone_number", { length: 18 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  active: boolean("active").notNull().default(true),
  role: rolesEnum.notNull().default("cashier"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  cart: many(cartTable),
}))

export const cartRelations = relations(cartTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [cartTable.userId],
    references: [usersTable.id],
  }),
  product: many(productsTable),
}));
