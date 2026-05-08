import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProduct, getSingleProducts } from "../../api/productapi";


function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProducts(id);
        setForm({
          name: res.data?.data?.name || "",
          price: res.data?.data?.price || "",
          description: res.data?.data?.description || "",
          image: res.data?.data?.image || "",
          stock: res.data?.data?.stock || "",
          category: res.data?.data?.category || "",
        });
      } catch (err) {
        setError("Failed to load product");
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setForm((prev) => ({
  //     ...prev,
  //     [name]: name === "price" ? Number(value) : value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files
        ? files[0]
        : name === "price" || name === "stock"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      if (form.image) {
        formData.append("image", form.image);
      }

      await editProduct(id, formData);
      navigate("/admin/products");
    } catch (err) {
      setError("Failed to update product");
      console.error(err.response?.data || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading product...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border p-2 rounded"
          />
        </div>

        <input
          name="stock"
          placeholder="STOCK"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="toy">TOY</option>
          <option value="electronic">ELECTRONIC</option>
          <option value="furniture">FURNITURE</option>
          <option value="fashion">FASHION</option>
          <option value="watch">WATCH</option>
          <option value="cosmetic">COSMETIC</option>
        </select>

        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {form.image && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Preview:</p>

            <img
              src={
                typeof form.image === "string"
                  ? form.image
                  : URL.createObjectURL(form.image)
              }
              alt="preview"
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default AdminEditProduct;
