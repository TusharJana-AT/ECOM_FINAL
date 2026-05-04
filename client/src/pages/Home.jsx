import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { deleteProduct, getProducts, getWish } from "../api/api";
import { useDispatch } from "react-redux";
import { setWishlist } from "../features/cart/wishlistSlice";
import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);

        console.log(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    const wish = async () => {
      try {
        if (!user || user.role !== "user") return;
        const res = await getWish();
        dispatch(setWishlist(res.data.wishlist));
      } catch (error) {
        console.log(error);
      }
    };  
    wish();
  }, [user]);
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "" || p.category === category;

    return matchesSearch && matchesCategory;
  });
  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-4">
      <div className="flex justify-end mb-4">
    <button
      onClick={() => setShowFilters((prev) => !prev)}
      className="px-4 py-2 text-white rounded hover:bg-gray-300"
    >
      🔎
    </button>
  </div>
      {showFilters && (
        <div className="mb-4 space-y-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">All Categories</option>
            <option value="toy">Toy</option>
            <option value="electronic">Electronic</option>
            <option value="furniture">Furniture</option>
            <option value="fashion">Fashion</option>
            <option value="watch">Watch</option>
          </select>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : products.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
      </div>
    </div>
  );
};

export default Home;
