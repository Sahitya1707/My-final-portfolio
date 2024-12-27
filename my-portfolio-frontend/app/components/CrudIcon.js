const Icon = ({ icon, color, handleButton, id }) => {
  return (
    <span
      className="text-2xl cursor-pointer"
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
