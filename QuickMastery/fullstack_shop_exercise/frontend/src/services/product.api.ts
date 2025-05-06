import ModelAPI from "../abstract/service.abstract";
import { ProductFormData, ProductType } from "../types/index";

const baseUrl = import.meta.env.VITE_BASE_URL_API;

class ProductAPI extends ModelAPI<ProductType> {
  constructor() {
    super();
  }

  async getById(id: number): Promise<ProductType> {
    const response = await fetch(`${baseUrl}/products/${id}`);
    const json = await response.json();
    console.log("Status: ", json.status, "; Message: ", json.message);
    const data = json.data;
    return data;
  }

  async getAll(): Promise<ProductType[]> {
    const response = await fetch(`${baseUrl}/products`);

    const json = await response.json();
    console.log("Status: ", json.status, "; Message: ", json.message);

    const data = json.data;
    return data;
  }

  async create(user: ProductFormData): Promise<ProductType> {
    const response = await fetch(`${baseUrl}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const json = await response.json();
    console.log("Status: ", json.status, "; Message: ", json.message);

    const data = json.data;
    return data;
  }

  async update(id: number, user: ProductFormData): Promise<ProductType> {
    const response = await fetch(`${baseUrl}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const json = await response.json();
    console.log("Status: ", json.status, "; Message: ", json.message);

    const data = json.data;
    return data;
  }

  async delete(id: number): Promise<number> {
    const response = await fetch(`${baseUrl}/products/${id}`, {
      method: "DELETE",
    });

    const json = await response.json();
    console.log("Status: ", json.status, "; Message: ", json.message);

    const data = json.data;
    return data;
  }
}

export default new ProductAPI();
