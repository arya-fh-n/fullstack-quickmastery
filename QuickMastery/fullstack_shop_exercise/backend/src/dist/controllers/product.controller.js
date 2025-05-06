import AbstractModel from "../abstracts/model.abstract.js";
import { db } from "../db/index.js";
import { productsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import dotenv from "dotenv";
dotenv.config();
// Product controller
class ProductController extends AbstractModel {
    async getById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.json({
                    status: "Error",
                    message: "Invalid product ID",
                });
            }
            const product = await db
                .select()
                .from(productsTable)
                .where(eq(productsTable.id, id))
                .limit(1);
            if (product.length === 0) {
                return res.json({
                    status: "Error",
                    message: "Product not found",
                });
            }
            const data = product[0];
            return res.json({
                status: "Success",
                message: "Product fetched successfully",
                data: data,
            });
        }
        catch (error) {
            console.error("Error fetching product:", error);
            return res.json({
                status: "Error",
                error: "Failed to fetch product",
            });
        }
    }
    async getAll(req, res) {
        try {
            const allProducts = await db.select().from(productsTable);
            const data = allProducts;
            if (data.length === 0) {
                return res.json({
                    status: "Error",
                    message: "No products found",
                });
            }
            return res.json({
                status: "Success",
                message: "Products fetched successfully",
                data: data,
            });
        }
        catch (error) {
            console.error("Error fetching products:", error);
            return res.json({
                status: "Error",
                error: "Failed to fetch products",
            });
        }
    }
    async create(req, res) {
        try {
            const { name, price, category, stock } = req.body;
            if (!name || !price || !category) {
                return res
                    .status(400)
                    .json({ error: "Name, price, and category are required" });
            }
            const productData = {
                name,
                price,
                category,
                stock: stock ?? 0,
            };
            await db.insert(productsTable).values(productData);
            return res.json({
                status: "Success",
                message: "Product created successfully",
            });
        }
        catch (error) {
            console.error("Error creating product :", error);
            return res.json({
                status: "Error",
                message: "Failed to create product",
            });
        }
    }
    async update(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.json({
                    status: "Error",
                    message: "Invalid product ID",
                });
            }
            const { name, price, category, stock } = req.body;
            const existingProduct = await db
                .select()
                .from(productsTable)
                .where(eq(productsTable.id, id))
                .limit(1);
            if (existingProduct.length === 0) {
                return res.json({
                    status: "Error",
                    message: "Product not found",
                });
            }
            const updateData = {};
            if (name !== undefined)
                updateData.name = name;
            if (price !== undefined)
                updateData.price = price;
            if (category !== undefined)
                updateData.category = category;
            if (stock !== undefined)
                updateData.stock = stock;
            await db
                .update(productsTable)
                .set(updateData)
                .where(eq(productsTable.id, id));
            const result = await db
                .select()
                .from(productsTable)
                .where(eq(productsTable.id, id))
                .limit(1);
            const data = result[0];
            return res.json({
                status: "Success",
                message: "Product updated successfully",
                data: data,
            });
        }
        catch (error) {
            console.error("Error updating product:", error);
            return res.json({
                status: "Error",
                message: "Failed to update product",
            });
        }
    }
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.json({
                    status: "Error",
                    message: "Invalid product ID",
                });
            }
            const existingProduct = await db
                .select()
                .from(productsTable)
                .where(eq(productsTable.id, id))
                .limit(1);
            if (existingProduct.length === 0) {
                return res.json({
                    status: "Error",
                    message: "Product not found",
                });
            }
            await db.delete(productsTable).where(eq(productsTable.id, id));
            return res.json({
                status: "Success",
                message: "Product deleted successfully",
                data: existingProduct[0].id,
            });
        }
        catch (error) {
            console.error("Error deleting product:", error);
            return res.json({
                status: "Error",
                message: "Failed to delete product",
            });
        }
    }
}
export default new ProductController();
