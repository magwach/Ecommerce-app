import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  error: null,
  editMode: false,
  loading: null,
  setProducts: (products) => set({ products }),
  setError: (error) => set({ error }),
  setEditMode: (editMode) => set({ editMode }),
  setLoading: (loading) => set({ loading }),
  createProduct: async (newProduct) => {
    try {
      const res = await fetch("api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (data.success) {
        set((state) => ({ error: false }));
      } else {
        set((state) => ({ error: true }));
      }

      if (data.data) {
        set((state) => ({ products: [...state.products, data.data] }));
      }
      return {
        success: data.success,
        message: data.message || "Product created successfully",
      };
    } catch (e) {
      set((state) => ({ error: true }));
      return {
        success: false,
        message: "Server Error",
      };
    }
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("api/products");
      const data = await res.json();

      if (data.success) {
        set((state) => ({ error: false }));
      } else {
        set((state) => ({ error: true }));
      }

      if (data.data) {
        set((state) => ({ products: data.data }));
      }
      set((state) => ({ loading: false }));
      return {
        success: data.success,
        message: data.message || "Products fetched successfully",
      };
    } catch (e) {
      set((state) => ({ error: true }));
      set((state) => ({ loading: false }));
      return {
        success: false,
        message: "Server Error",
      };
    }
  },
  deleteProduct: async (id, name) => {
    try {
      let updatedProducts;
      const res = await fetch(`api/products/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        set((state) => {
          updatedProducts = state.products.filter((p) => p._id !== id);
          return { products: updatedProducts, error: false };
        });
        set((state) => ({ products: updatedProducts }));
      } else {
        set((state) => ({ error: true }));
      }

      return {
        success: data.success,
        message:
          res.status === 200
            ? `${name} deleted sucessfully`
            : data.message || "Products fetched successfully",
      };
    } catch (e) {
      set((state) => ({ error: true }));
      return {
        success: false,
        message: e.message,
      };
    }
  },
  updateProduct: async function (id, currItem) {
    try {
      const res = await fetch(`api/products/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currItem),
      });
      console.log(currItem);


      const data = await res.json();
      console.log(data)

      if (data.success) {
        set((state) => {
          const updatedProducts = state.products.map((p) =>
            p._id === currItem._id ? data.data : p
          );
          return { products: updatedProducts, error: false };
        });
        return {
          success: data.success,
          message: data.message || "Product updated successfully",
        };
      }
    } catch (e) {
      set((state) => ({ error: true }));
      return {
        success: false,
        message: e.message,
      };
    }
  },
}));
