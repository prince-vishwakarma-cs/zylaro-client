import { ChangeEvent, useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartReducerInitialState } from "../types/reducerTypes";

const Shipping = () => {
  const { cartItems } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const changeInfo = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <div className="shipping">
      <button className="back" onClick={() => navigate("/cart")}>
        <ArrowLeft />
      </button>
      <form action="">
        <h1>Shipping Address</h1>
        <input
          required
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={changeInfo}
        />
        <input
          required
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={changeInfo}
        />
        <input
          required
          type="text"
          name="state"
          placeholder="State"
          value={shippingInfo.state}
          onChange={changeInfo}
        />
        <select
          required
          name="country"
          value={shippingInfo.country}
          onChange={changeInfo}
        >
          <option value="">Choose Country</option>
          <option value="india">India</option>
        </select>
        <input
          required
          type="number"
          name="pincode"
          placeholder="Pincode"
          value={shippingInfo.pincode}
          onChange={changeInfo}
        />
        <button type="submit"> Pay now</button>
      </form>
    </div>
  );
};

export default Shipping;
