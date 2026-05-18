import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { getSingleProducts } from "../../api/productapi";
import { addReview, deleteReview, getReview } from "../../api/reviewApi";
import { useAuth } from "../../auth/AuthContext";
import { formatDate } from "../../components/helper/formatDate";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(true);
  const [form, setForm] = useState({
    rating: "",
    comment: "",
  });
  const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems);

  const isInCart = cartItems.some((item) => item.id === product?.id);

  const dispatch = useDispatch();

  const { user } = useAuth();
  // console.log("MyUSER",user?.name);

  const myReview = review.find((rev) => rev.userId === user?.id);
  // console.log("myRev", myReview);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await getSingleProducts(id);

        setProduct(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const getProductReviews = async () => {
      try {
        setReviewLoading(true);

        const res = await getReview(id);

        setReview(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setReviewLoading(false);
      }
    };

    getProductReviews();
  }, [id]);

  // console.log("Review", review);
  // console.log("aaa2", product);
  // console.log("Product", product.id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res=await addReview(id, form);
      setReview((prev) => [res.data.data, ...prev]);
      setForm({
        rating: "",
        comment: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "rating" ? Number(value) : value,
    });
  };


  const handleDelete = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      setReview((prev) => prev.filter((val) => val.id !== reviewId));
      console.log("USer Deleted");
    } catch (error) {
      console.log(error);
    }
  };
  // {review.map((rev)=>(console.log("REVVV",rev)))}

  
  if (loading) {
    return <h2>Loading product...</h2>;
  }


  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Product  */}
      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm rounded-xl object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="w-fit bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm mb-4 capitalize">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold mb-3">{product.name}</h1>

          <p className="text-gray-500 mb-4">
            Brand:
            <span className="font-medium text-black ml-1">
              {product.brand || "No Brand"}
            </span>
          </p>

          <div className="flex items-center gap-3 mb-5">
            <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              ⭐ {product.rating?.toFixed(1)}
            </div>

            <span className="text-gray-500 text-sm">
              ({product.numReviews} reviews)
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-green-600">
              ₹ {product.price}
            </h2>

            {product.discountPrice && (
              <span className="text-gray-400 line-through text-lg">
                ₹ {product.discountPrice}
              </span>
            )}
          </div>

          <p
            className={`mb-6 font-medium ${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
          </p>

          <button
            className={`w-fit px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              isInCart
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-amber-400 hover:bg-amber-500 text-black"
            }`}
            onClick={() => dispatch(addToCart(product))}
            disabled={isInCart}
          >
            {isInCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
      {!myReview && (
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow rounded-2xl p-6 mb-10">
            <h2 className="text-2xl font-bold mb-4">Write a Review</h2>

            {/* Rating */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Rating</label>

              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full"
              >
                <option value="">Select One</option>
                <option value={5}>5</option>
                <option value={4}>4</option>
                <option value={3}>3</option>
                <option value={2}>2</option>
                <option value={1}>1</option>
              </select>
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Comment</label>

              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                rows="4"
                className="border rounded-lg p-3 w-full"
                placeholder="Write your thoughts..."
              />
            </div>

            <button className="bg-black text-white px-5 py-2 rounded-xl">
              Submit Review
            </button>
          </div>
        </form>
      )}
      {/* Reviews */}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        {reviewLoading ? (
          <p>Loading reviews...</p>
        ) : review.length === 0 ? (
          <div className="bg-gray-100 rounded-xl p-6 text-center text-gray-500">
            No reviews yet
          </div>
        ) : (
          <div className="space-y-4">
            {review.map((rev) => (
              <div
                key={rev.id}
                className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >

                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{rev.User?.name}</h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(rev.createdAt)}
                    </p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ {rev.rating} / 5
                  </span>
                </div>

                {/* Comment */}
                <p className="text-gray-700 leading-relaxed">{rev.comment}</p>
                {rev.userId === user?.id && (
                  <div className="flex justify-end gap-3 mt-4">
                    <button className="text-blue-600 font-medium">Edit</button>

                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
         
      </div>
    </div>
  );
};

export default Product;
