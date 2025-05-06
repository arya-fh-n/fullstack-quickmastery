import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq } from "drizzle-orm";
import { productsTable, categoriesTable, usersTable, cartTable } from "./schema.js";
import * as schema from "./schema.js";
import { EnvVars } from "src/types";

dotenv.config();

const env: EnvVars = {
  DB_HOST: process.env.DB_HOST ?? "localhost",
  DB_PORT: parseInt(process.env.DB_PORT ?? "3306", 3306),
  DB_USER: process.env.DB_USER ?? "root",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  DB_NAME: process.env.DB_NAME ?? "my_express_app",
  PORT: parseInt(process.env.PORT ?? "3000", 3000),
};

// Initialize database connection
const poolConnection = mysql.createPool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Initialize and export drizzle
export const db = drizzle(poolConnection, {
  schema: schema,
  mode: "default"
});

// Simple query to test connection
export async function testConnection(): Promise<boolean> {
  try {
    // Simple query to test connection
    const [result] = await poolConnection.query("SELECT 1 AS result");
    console.log("Database connection successful!", result);
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

// Simple query to test connection and transaction
export async function main() {
  const user: typeof usersTable.$inferInsert = {
    username: "admin",
    password: "admin",
    fullname: "Admin Shop",
    phone_number: "081234567890",
    role: "admin",
    active: true,
  }

  await db.insert(usersTable).values(user);
  console.log("New User Inserted!");

  const categories: typeof categoriesTable.$inferInsert = {
    name: "Barang",
    description: "No description has been added yet.",
  };

  await db.insert(categoriesTable).values(categories);
  console.log("New Category Inserted!");

  const product: typeof productsTable.$inferInsert = {
    name: "Barang",
    price: 10000.0,
    category: 1,
    stock: 10,
  };

  await db.insert(productsTable).values(product);
  console.log("New Product Inserted!");

  const allProducts = await db.select().from(productsTable);
  console.log("Select All Products: ", allProducts);

  await db.update(productsTable).set({ stock: 20 }).where(eq(productsTable.id, 1));
  console.log("Update Product Stock!: ");

  const productById = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, 1));
  console.log("Get Product By ID: ", productById);
  console.log("Updated product: ", productById);

  const cart: typeof cartTable.$inferInsert = {
    userId: 1,
    productId: 1,
    quantity: 2,
  };

  await db.insert(cartTable).values(cart);
  console.log("New Cart Inserted!");
}
