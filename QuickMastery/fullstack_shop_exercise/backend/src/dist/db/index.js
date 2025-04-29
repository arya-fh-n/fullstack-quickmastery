import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { eq } from "drizzle-orm";
import { productsTable as products } from "./schema.js";
dotenv.config();
const env = {
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
export const db = drizzle(poolConnection);
// Simple query to test connection
export async function testConnection() {
    try {
        // Simple query to test connection
        const [result] = await poolConnection.query("SELECT 1 AS result");
        console.log("Database connection successful!", result);
        return true;
    }
    catch (error) {
        console.error("Database connection failed:", error);
        return false;
    }
}
// Simple query to test connection and transaction
export async function main() {
    const product = {
        name: "Barang",
        price: 10000.0,
        category: "Barang",
        stock: 10,
    };
    await db.insert(products).values(product);
    console.log("New Product Inserted!");
    const allProducts = await db.select().from(products);
    console.log("Select All Products: ", allProducts);
    await db.update(products).set({ stock: 20 }).where(eq(products.id, 1));
    console.log("Update Product Stock!: ");
    const productById = await db
        .select()
        .from(products)
        .where(eq(products.id, 1));
    console.log("Get Product By ID: ", productById);
    console.log("Updated product: ", productById);
    await db.delete(products).where(eq(products.id, 1));
    console.log("Product Deleted!");
}
