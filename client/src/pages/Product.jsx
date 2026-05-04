import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const Product = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState({});
  const cartItems = useSelector((state) => state.cart);
console.log(cartItems);

  const isInCart = cartItems.some((item) => item.id === product?.id);
 
  const dispatch = useDispatch();

  

  useEffect(() => {
    console.log("aaa",product);
    
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };

    fetchProduct();
  }, [id]);
        console.log("aaa2",product);
  if (!product) {


    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <img src={product.imageUrl} alt="" width="200px" />

      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>₹ {product.price}</h3>

      <button
          className={`bg-amber-400 rounded-xl m-3 p-1 cursor-pointer ${
            isInCart ? "bg-gray-400 cursor-not-allowed" : "hover:bg-amber-600"
          }`}
          onClick={() => dispatch(addToCart(product))}
          disabled={isInCart}
        >
          {isInCart ? "Added" : "Add to Cart"}
        </button>
    </div>
  )
};

export default Product;