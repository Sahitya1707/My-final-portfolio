const Icon = ({ icon, color, handleButton, id }) => {
  return (
    <span
      className="text-2xl"
      style={{
        color: color,
      }}
      onClick={() => {
        handleButton(id);
      }}
    >
      {icon}
    </span>
  );
};

export default Icon;
