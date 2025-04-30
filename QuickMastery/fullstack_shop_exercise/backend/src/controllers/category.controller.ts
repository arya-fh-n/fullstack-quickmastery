import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import { db } from "../db/index.js";
import { categoriesTable, productsTable } from "../db/schema.js";
import { eq, InferInsertModel, InferSelectModel } from "drizzle-orm";
import dotenv from "dotenv";

dotenv.config();

type Category = InferSelectModel<typeof categoriesTable>;
type NewCategory = InferInsertModel<typeof categoriesTable>;

// Category controller
class CategoryController extends AbstractModel {
  async getById(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.json({
          status: "Error",
          message: "Invalid category ID",
        });
      }

      // Standard query approach - use when we don't need relations
      const category = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.id, id))
        .limit(1);

      if (category.length === 0) {
        return res.json({
          status: "Error",
          message: "Category not found",
        });
      }

      const data: Category = category[0];

      return res.json({
        status: "Success",
        message: "Category fetched successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      return res.json({
        status: "Error",
        error: "Failed to fetch category",
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const allCategories = await db.select().from(categoriesTable);
      
      const data: Category[] = allCategories;

      if (data.length === 0) {
        return res.json({
          status: "Error",
          message: "No categories found",
        });
      }

      return res.json({
        status: "Success",
        message: "Categories fetched successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.json({
        status: "Error",
        error: "Failed to fetch categories",
      });
    }
  }

  async getProductsByCategory(req: Request, res: Response): Promise<any> {
    try {
      const categoryId = parseInt(req.params.id, 10);

      if (isNaN(categoryId)) {
        return res.json({
          status: "Error",
          message: "Invalid category ID",
        });
      }

      // Check if the category exists
      const category = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.id, categoryId))
        .limit(1);

      if (category.length === 0) {
        return res.json({
          status: "Error",
          message: "Category not found",
        });
      }

      // Get all products for this category
      const products = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.category, categoryId));

      return res.json({
        status: "Success",
        message: "Products fetched successfully",
        category: category[0],
        data: products,
      });
    } catch (error) {
      console.error("Error fetching products by category:", error);
      return res.json({
        status: "Error",
        error: "Failed to fetch products by category",
      });
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ error: "Name is required" });
      }

      const categoryData: NewCategory = {
        name,
        description: description ?? "No description has been added yet.",
      };

      await db.insert(categoriesTable).values(categoryData);
      
      return res.json({
        status: "Success",
        message: "Category created successfully",
      });
    } catch (error) {
      console.error("Error creating category:", error);
      return res.json({
        status: "Error",
        message: "Failed to create category",
      });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.json({
          status: "Error",
          message: "Invalid category ID",
        });
      }

      const { name, description } = req.body;

      const existingCategory = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.id, id))
        .limit(1);

      if (existingCategory.length === 0) {
        return res.json({
          status: "Error",
          message: "Category not found",
        });
      }

      const updateData: Partial<Category> = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;

      await db
        .update(categoriesTable)
        .set(updateData)
        .where(eq(categoriesTable.id, id));

      const result = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.id, id))
        .limit(1);

      const data: Category = result[0];

      return res.json({
        status: "Success",
        message: "Category updated successfully",
        data: data,
      });
    } catch (error) {
      console.error("Error updating category:", error);
      return res.json({
        status: "Error",
        message: "Failed to update category",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const id = parseInt(req.params.id, 10);

      if (isNaN(id)) {
        return res.json({
          status: "Error",
          message: "Invalid category ID",
        });
      }

      // Check if the category exists
      const existingCategory = await db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.id, id))
        .limit(1);

      if (existingCategory.length === 0) {
        return res.json({
          status: "Error",
          message: "Category not found",
        });
      }

      // Check if there are products using this category
      const associatedProducts = await db
        .select()
        .from(productsTable)
        .where(eq(productsTable.category, id))
        .limit(1);

      if (associatedProducts.length > 0) {
        return res.json({
          status: "Error",
          message: "Cannot delete category with associated products",
        });
      }

      await db.delete(categoriesTable).where(eq(categoriesTable.id, id));

      return res.json({
        status: "Success",
        message: "Category deleted successfully",
        data: existingCategory[0].id,
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      return res.json({
        status: "Error",
        message: "Failed to delete category",
      });
    }
  }
}

export default new CategoryController();