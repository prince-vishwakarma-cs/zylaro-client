import { useEffect, useState } from "react";

import { ArrowLeft, ArrowRight } from "react-feather";

const carouselImages = [
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743951/hero_mogjy2.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743950/hero5_tljywh.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743950/hero3_lo57jf.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743955/hero6_iskgme.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743957/hero2_ysjift.jpg",
  "https://res.cloudinary.com/dtjfmg11y/image/upload/v1737743960/hero4_rrton3.jpg",
];

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
