// Product interface definition
export interface ProductType {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

// New product form data (without ID)
export interface ProductFormData {
  name: string;
  price: number;
  category: string;
  stock: number;
}

// Redux product state
export interface ProductState {
  products: ProductType[];
  product: ProductType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
