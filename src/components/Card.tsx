import heart from "../assets/Line.svg";
import { CartItem } from "../types/types";
import { transformImage } from "../utils/features";

type ProductProps = {
  productId: string;
  photos: {
    url: string;
    public_id: string
  }[];
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

import { useNavigate } from "react-router-dom"; // For navigation

const Card = ({
  productId,
  price,
  name,
  photos,
  stock,
  handler,
}: ProductProps) => {
  const navigate = useNavigate(); // Hook for navigation

  const navigateToProductPage = () => {
    navigate(`/product/${productId}`); // Adjust the route as per your routing setup
  };

  return (
    <div className="productCard" onClick={navigateToProductPage}>
      <div className="productImageWrapper">
        <img
          className="p-image"
          style={{ objectFit: "cover" }}
          src={transformImage(photos[0].url)}
          alt={name}
        />
        <div>
          <div>
            <div className="extras">
              <button className="btn1" onClick={(e) => e.stopPropagation()}>
                NEW
              </button>
              <button className="btn2" onClick={(e) => e.stopPropagation()}>
                -50%
              </button>
            </div>
            <img
              className="like"
              src={heart}
              alt="Like"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card navigation
              handler({
                productId,
                photo: transformImage(photos[0].url),
                name,
                price,
                quantity: 1,
                stock,
              });
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="details">
        <p>{name}</p>
        <span>{`₹${price}`}</span>
      </div>
    </div>
  );
};


export default Card;
