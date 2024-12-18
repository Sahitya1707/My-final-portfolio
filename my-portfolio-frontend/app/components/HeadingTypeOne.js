const HeadingTypeOne = ({ text }) => {
  return (
    <h1
      className="relative text-primary text-2xl uppercase after:content-[''] after:bg-colorText after:h-[1px] xl:after:w-[70vw] lg:after:w-[65vw] after:w-[55vw] after:absolute after:top-[50%] xl:after:left-[15%] lg:after:left-[20%] after:left-[25%] tracking-widest"
      style={{
        textShadow: "1px 0.2px rgb(var(--color-text))",
      }}
    >
      {text}
    </h1>
  );
};

export default HeadingTypeOne;
