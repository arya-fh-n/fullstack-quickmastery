import { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/use.app.dispatch";
import { addProduct, updateProduct } from "../store/slices/product.slice";
import { ProductType } from "../types";

interface ProductFormProps {
  product?: ProductType;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  price?: string;
  category?: string;
  stock?: string;
}

const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        stock: product.stock.toString(),
      });
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.stock.trim()) {
      newErrors.stock = "Stock is required";
    } else if (
      isNaN(Number(formData.stock)) ||
      !Number.isInteger(Number(formData.stock)) ||
      Number(formData.stock) < 0
    ) {
      newErrors.stock = "Stock must be a non-negative integer";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const productData = {
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      stock: Number(formData.stock),
    };

    if (product) {
      dispatch(updateProduct({ ...productData, id: product.id }));
    } else {
      dispatch(addProduct(productData));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-bold text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                errors.price ? "border-red-500" : ""
              }`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-bold text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.category ? "border-red-500" : ""
              }`}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-bold text-gray-700"
            >
              Stock
            </label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
                errors.stock ? "border-red-500" : ""
              }`}
            />
            {errors.stock && (
              <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {product ? "Update" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
