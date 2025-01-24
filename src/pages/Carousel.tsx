import { useEffect, useState } from "react";

import hero from "../assets/images/hero.webp";
import hero2 from "../assets/images/hero2.webp";
import hero3 from "../assets/images/hero3.webp";
import hero4 from "../assets/images/hero4.webp";
import hero5 from "../assets/images/hero5.webp";
import hero6 from "../assets/images/hero6.webp";
import { ArrowLeft, ArrowRight } from "react-feather";

const carouselImages = [hero, hero3, hero4, hero5, hero6, hero2];

const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {carouselImages.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
            <div className="carousel-overlay"></div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button className="carousel-btn prev" onClick={prevSlide}>
        <ArrowLeft />
      </button>
      <button className="carousel-btn next" onClick={nextSlide}>
        <ArrowRight />
      </button>

      {/* Dots Navigation */}
      <div className="carousel-dots">
        {carouselImages.map((_, index) => (
          <span
            key={index}
            className={`dot-carousel ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousal;
