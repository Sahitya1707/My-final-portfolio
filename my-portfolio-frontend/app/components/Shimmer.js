const Shimmer = ({ rounded, radius, height, width, margin }) => {
  return (
    <p
      className="animate-pulse bg-colorNav"
      style={{
        height: height,
        width: width,
        borderRadius: radius,
        margin: margin,
      }}
    ></p>
  );
};

export default Shimmer;
