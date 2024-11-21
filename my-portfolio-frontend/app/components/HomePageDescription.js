import React from "react";
import ButtonTypeOne from "./ButtonTypeOne";

const HomePageDescription = () => {
  return (
    <section className="flex flex-col align-center justify-center h-[70vh] w-full">
      <div className="">
        <p
          className="uppercase text-colorText text-5xl  tracking-[0.4rem] font-bold"
          style={{
            textShadow: "3px 2px rgb(var(--primary-clr))",
          }}
        >
          Hey, I am Sahitya <br />
          Neupane!
        </p>
        <p
          className="capitalize text-4xl text-primary mt-4 tracking-widest font-semibold"
          style={{ textShadow: "1px 1px rgb(var(--color-text))" }}
        >
          {/* run animation maybe through stroke */}
          FullStack Developer
        </p>
        <ButtonTypeOne
          color={"colorText"}
          bgColor={"primary"}
          text={"About Me"}
          link={"/about"}
        />
      </div>
    </section>
  );
};

export default HomePageDescription;
