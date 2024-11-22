import React from "react";
import ButtonTypeOne from "./ButtonTypeOne";
import BackgroundText from "./BackgroundText";

const HomePageDescription = () => {
  return (
    <section className="flex  align-center items-center justify-evenly h-full w-full ">
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
          style={{ textShadow: "1px 2px rgb(var(--color-text))" }}
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
      <BackgroundText
        text="</>"
        style={{
          WebkitTextStroke: "2px rgb(var(--primary-clr))",
          opacity: "80%",
        }}
      />
      {/* <span
        className="text-colorText/5 text-[20rem] stroke-none font-poppins-500 rotate-[-10deg] opacity-80"
        style={{
          WebkitTextStroke: "2px rgb(var(--primary-clr))",
          // transform: position,
        }}
      >
        {"</>"}
      </span> */}
    </section>
  );
};

export default HomePageDescription;
