import { Link } from "react-router-dom";
import { Trash2 } from "react-feather";
import { CartItem as CartItemInfo } from "../types/types";

type CartItemProps = {
  cartItem: CartItemInfo;
  incrementHandler: (cartItem: CartItemInfo) => void;
  decrementHandler: (cartItem: CartItemInfo) => void;
  removeHandler: (id: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, name, price, quantity, productId } = cartItem;
  return (
    <div className="cart-item">
      <img src={photo} alt={name} style={{objectFit:"cover"}}/>
      <article>
        <Link to={`/product/${productId}`}></Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button onClick={() => decrementHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}>+</button>
      </div>
      <button onClick={() => removeHandler(productId)}>
        <Trash2 />
      </button>
    </div>
  );
};

export default CartItem;
