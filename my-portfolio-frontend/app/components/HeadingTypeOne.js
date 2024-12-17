const HeadingTypeOne = ({ text }) => {
  return (
    <h1
      className="relative text-primary text-2xl uppercase after:content-[''] after:bg-colorText after:h-[1px] after:w-[70vw] after:absolute after:top-[50%] after:left-[15%] tracking-widest"
      style={{
        textShadow: "0.2px 0.2px rgb(var(--color-text))",
      }}
    >
      {text}
    </h1>
  );
};

export default HeadingTypeOne;
