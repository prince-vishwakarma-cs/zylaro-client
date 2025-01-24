import { useEffect, useState } from "react";
import { AlertTriangle } from "react-feather";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartSlice";
import { CartReducerInitialState } from "../types/reducerTypes";
import { CartItem } from "../types/types";
import axios from "axios";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState("");
  const [validCode, setValidCode] = useState(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return toast.error("Out of Stock");

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();
    const timeOutId = setTimeout(() => {
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER
          }/api/v1/payment/discount?code=${couponCode}`,
          {
            cancelToken,
          }
        )
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          dispatch(calculatePrice());
          setValidCode(true);
        })
        .catch(() => {
          dispatch(discountApplied(0));
          dispatch(calculatePrice());
          setValidCode(false);
        });
      if (Math.random() > 0.5) setValidCode(true);
      else setValidCode(false);
    }, 500);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setValidCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => (
            <CartItemCard
              key={idx}
              cartItem={item}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1>No item in Cart</h1>
        )}
      </main>
      <aside>
        <p>Subtotal : ₹{subtotal}</p>
        <p>Shipping Charges : ₹{shippingCharges}</p>
        <p>Tax : ₹{tax}</p>
        <p>
          Discount : <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total : ₹{total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (validCode ? (
            <span className="green">
              ₹{discount} off using coupon code <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon Code <AlertTriangle />
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
