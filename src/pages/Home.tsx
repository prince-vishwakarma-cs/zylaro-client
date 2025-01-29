
import { ArrowRight } from "react-feather";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import call from "../assets/call.svg";
import shipp from "../assets/fast delivery.svg";
import show1 from "../assets/images/show1.png";
import show2 from "../assets/images/show2.png";
import show3 from "../assets/images/show3.png";
import lock from "../assets/lock 01.svg";
import money from "../assets/money.svg";
import Card from "../components/Card";
import { Skeleton } from "../components/Loader";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addToCart } from "../redux/reducer/cartSlice";
import { CartItem } from "../types/types";
import Carousel from "./Carousel";
import { Facebook,Twitter,Instagram } from "react-feather";

const carouselImages = [
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743951/hero_mogjy2.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743950/hero5_tljywh.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743950/hero3_lo57jf.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743955/hero6_iskgme.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743957/hero2_ysjift.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743960/hero4_rrton3.jpg",
];

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };

  if (isError) toast.error("Error in fetching the products");

  return (
    <div className="home">
      <section>
        {/* Carousel
        <img src={hero} alt="" /> */}
        <Carousel images={carouselImages} />
      </section>
      <div className="heading">
        <div className="head1">
          Simply Unique<span className="lightgray">/</span>
          <br /> Simply Better<span className="lightgray">.</span>
        </div>
        <div className="head2">
          Zylaro{" "}
          <span className="lightgray">
            is a Home decor marketplace based in India. <br />
            Est since 2019.{" "}
          </span>
        </div>
      </div>
      <div className="showcase">
        <div className="show1">
          <img src={show1} alt="" />
          <div className="show1-content">
            <h1>Living room</h1>
            <div>
              <Link to="/search?category=living-room">
                <div>Shop now</div> <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="show2">
            <img src={show2} alt="" />
            <div className="show2-content">
              <h1>Bedroom</h1>
              <div>
                <Link to="/search?category=bedroom">
                  <div>Shop now</div> <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
          <div className="show3">
            <img src={show3} alt="" />
            <div className="show3-content">
              <h1>Kitchen</h1>
              <div>
                <Link to="/search?category=kitchen">
                  <div>Shop now</div> <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="new-arrival">
        <div>
          {" "}
          New<br></br>Arrivals
        </div>
        <Link to="/search" className="findmore">
          More Products <ArrowRight />
        </Link>
      </div>
      <main>
        {isLoading ? (
          <Skeleton />
        ) : (
          data?.products.map((product) => (
            <Card
              key={product._id}
              productId={product._id}
              price={product.price}
              stock={product.stock}
              name={
                product.name.length > 15
                  ? product.name.slice(0, 18) + "..."
                  : product.name
              }
              photos={product.photos}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
      <div className="features">
        <div className="feature1">
          <img src={shipp} alt="" />
          <h1>Free Shipping</h1>
          <span>Orders above $200</span>
        </div>
        <div className="feature2">
          <img src={money} alt="" />
          <h1>Money Back</h1>
          <span>30 days guarantee</span>
        </div>
        <div className="feature3">
          <img src={lock} alt="" />
          <h1>Secure Payments</h1>
          <span>Secured by stripe</span>
        </div>
        <div className="feature4">
          <img src={call} alt="" />
          <h1>24/7 Support</h1>
          <span>Phone and email support</span>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3>
              <span className="green">Z</span>ylaro.
            </h3>
            <p>
              Zylaro is your go-to marketplace for elegant and unique home
              decor. Established in 2019, we are committed to providing premium
              products to elevate your living spaces.
            </p>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/search">Shop</Link>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email: support@zylaro.com</p>
            <p>Phone: +91-123-456-7890</p>
            <p>Address: 123 Zylaro Street, New Delhi, India</p>
          </div>

          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="social-icon" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="social-icon" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="social-icon" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © 2023 Zylaro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

// 734 ke baad pagla jata hai
