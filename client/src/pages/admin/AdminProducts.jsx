import React, { useEffect, useState } from "react";
import { getProducts, deleteProduct, editProduct } from "../../api/api";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleEdit = async (id) => {
    try {
      navigate(`/admin/edit/${id}`);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      console.log("Deleted");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        console.log("Priducts", res.data);

        setProducts(res.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Image</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Stock</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="p-2">
                  <img
                    className="w-16 h-16 object-contain rounded-sm"
                    src={p.image}
                  />
                </td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">{p.stock}</td>
                <td className="p-2">₹ {p.price}</td>

                <td className="p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(p.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-tr-xl rounded-bl-xl hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-tr-xl rounded-bl-xl hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminProducts;
