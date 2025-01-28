import { useRating } from "6pp";
import { FaRegStar, FaStar } from "react-icons/fa";

const RatingsComponent = ({ value = 0 }: { value: number }) => {
  const { Ratings } = useRating({
    IconFilled: <FaStar />,
    IconOutline: <FaRegStar />,
    value,
    styles: {
      fontSize: "2rem",
      color: "coral",
      cursor: "pointer",
      transition: "transform 0.3s ease, color 0.3s ease",
    },
  });

  return (
    <div className="ratings-container" style={styles.container}>
      <div className="ratings">
        <Ratings />
      </div>
      <span style={styles.value}>{value.toFixed(1)} / 5</span>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  value: {
    fontSize: "1.25rem",
    color: "#333",
    fontWeight: "500",
  },
  ratings: {
    display: "flex",
    gap: "0.25rem",
    "& svg": {
      transition: "color 0.3s ease",
    },
    "& svg:hover": {
      transform: "scale(1.1)",
      color: "#ff9900",
    },
  },
};

export default RatingsComponent;
