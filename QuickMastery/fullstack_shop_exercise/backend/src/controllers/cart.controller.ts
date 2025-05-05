import { Request, Response } from "express";
import AbstractModel from "../abstracts/model.abstract.js";
import { db } from "../db/index.js";
import { cartTable, productsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { Cart, CartType, NewCart } from "src/types/index.js";

class CartController extends AbstractModel {
  async getById(req: Request, res: Response): Promise<any> {
    try {
      const userId = parseInt(req.params.id);
      if (isNaN(userId)) {
        return res.json({ status: "Error", message: "Invalid user ID" });
      }

      const items = await db
        .select({
          id: cartTable.id,
          quantity: cartTable.quantity,
          userId: cartTable.userId,
          productId: productsTable.id,
          productName: productsTable.name,
          productPrice: productsTable.price,
        })
        .from(cartTable)
        .innerJoin(productsTable, eq(cartTable.productId, productsTable.id))
        .where(eq(cartTable.userId, userId));

      if (items.length === 0) {
        return res.json({ status: "Error", message: "No cart items found" });
      }

      const itemsTotal = items.map((item) => ({
        ...item,
        total: parseFloat(
          (item.productPrice * (item.quantity ?? 1)).toFixed(2)
        ),
      }));

      const data: CartType[] = itemsTotal;

      return res.json({
        status: "Success",
        message: "Cart fetched",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return res.json({
        status: "Error",
        message: "Failed to fetch user's cart items",
      });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const cartId = parseInt(req.params.id); // cart row ID
      const { quantity } = req.body;

      if (quantity == null || quantity < 1 || isNaN(parseInt(quantity))) {
        return res.json({
          status: "Error",
          message: "Invalid quantity",
        });
      }

      if (quantity === 0) {
        return res.json({
          status: "Error",
          message: "Quantity cannot be zero",
        });
      }

      if (isNaN(cartId)) {
        return res.json({
          status: "Error",
          message: "Invalid cart ID",
        });
      }

      const updatedCart: Partial<Cart> = {};
      if (quantity !== undefined) updatedCart.quantity = quantity;

      await db
        .update(cartTable)
        .set(updatedCart)
        .where(eq(cartTable.id, cartId));

      const items = await db
        .select({
          id: cartTable.id,
          userId: cartTable.userId,
          productId: productsTable.id,
          quantity: cartTable.quantity,
          productName: productsTable.name,
          productPrice: productsTable.price,
        })
        .from(cartTable)
        .innerJoin(productsTable, eq(cartTable.productId, productsTable.id))
        .where(eq(cartTable.id, cartId));

      const itemsTotal = items.map((item) => ({
        ...item,
        total: parseFloat(
          (item.productPrice * (item.quantity ?? 0)).toFixed(2)
        ),
      }));

      const data: CartType[] = itemsTotal;

      return res.json({
        status: "Success",
        message: "Cart item updated successfully",
        data: data,
      });
    } catch (error) {
      console.error(error);
      return res.json({ status: "Error", message: "Failed to update cart" });
    }
  }

  async getAll(req: Request, res: Response): Promise<any> {
    try {
      const carts = await db.select().from(cartTable);

      const data: Cart[] = carts;

      if (data.length === 0) {
        return res.json({ status: "Error", message: "No carts found" });
      }

      return res.json({ status: "Success", data: carts });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "Error", message: "Failed to fetch carts" });
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const userId = parseInt(req.params.id);
      const { productId, quantity } = req.body;

      if (isNaN(userId)) {
        return res.json({
          status: "Error",
          message: "Invalid user ID",
        });
      }

      if (!productId || !quantity) {
        return res.json({
          status: "Error",
          message: "userId and productId are required",
        });
      }

      const newCartItem: NewCart = {
        userId,
        productId,
        quantity: quantity ?? 1,
      };

      await db.insert(cartTable).values(newCartItem);

      return res.json({
        status: "Success",
        message: "Item added to cart",
      });
    } catch (error) {
      console.error("Error adding item to cart: ", error);
      return res.json({
        status: "Error",
        message: "Failed to add item to cart",
      });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const userId = parseInt(req.params.id, 10);

      if (isNaN(userId)) {
        return res.json({
          status: "Error",
          message: "Invalid cart ID",
        });
      }

      const existingCart = await db
        .select()
        .from(cartTable)
        .where(eq(cartTable.userId, userId))
        .limit(1);

      if (existingCart.length === 0) {
        return res.json({
          status: "Error",
          message: "Cart not found",
        });
      }

      await db.delete(cartTable).where(eq(cartTable.userId, userId));

      return res.json({ status: "Success", message: "Cart item deleted" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res.json({
        status: "Error",
        message: "Failed to delete product",
      });
    }
  }
}

export default new CartController();
