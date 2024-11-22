const HeadingTypeOne = ({ text }) => {
  return (
    <h1 className="relative text-primary text-2xl uppercase after:content-[''] after:bg-colorText after:h-[1px] after:w-[70vw] after:absolute after:top-[50%] after:left-[15%]">
      {text}
    </h1>
  );
};

export default HeadingTypeOne;
