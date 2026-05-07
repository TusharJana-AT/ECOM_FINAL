import { useState, useEffect } from "react";
import { createProduct } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
    category: "",
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) navigate("/login");
    else if (user.role !== "admin") navigate("/");
  }, [user, loading, navigate]);

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: files ? files[0] : value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoadingSubmit(true);

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("stock", form.stock);
    formData.append("category", form.category);

    if (form.image) {
      formData.append("image", form.image);
    }

    await createProduct(formData);

    setForm({
      name: "",
      price: "",
      description: "",
      image: "",
      stock: "",
      category: "",
    });

    navigate("/");

  } catch (error) {
    console.error(error.response?.data || error.message);
  } finally {
    setLoadingSubmit(false);
  }
};

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Add Product</h1>
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="toy">Toy</option>
          <option value="electronic">Electronic</option>
          <option value="furniture">Furniture</option>
          <option value="fashion">Fashion</option>
          <option value="watch">Watch</option>
        </select>
 
        <input
          name="image"
          type="file"
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        />
        {form.image && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Preview:</p>
            <img
              src={URL.createObjectURL(form.image)}
              alt="preview"
              className="w-32 h-32 object-cover border rounded"
            />
          </div>
        )}
        <button
          disabled={loadingSubmit}
          className={`w-full py-2 rounded-lg text-white ${
            loadingSubmit ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loadingSubmit ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

// import {z} from 'zod'
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// const schema=z.object({
//   name:z.string().min(2,"Product Name required"),
//     price:z.coerce.number().positive("Price should be positive"),
//     description:z.string().optional(),
//     imageUrl:z.string().url().optional()
// });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm({
//     resolver: zodResolver(schema),
//   });
