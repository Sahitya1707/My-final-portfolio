import Image from "next/image";
import BackgroundText from "./BackgroundText";
import ButtonTypeOne from "./ButtonTypeOne";
import HeadingTypeOne from "./HeadingTypeOne";

const AboutDescription = () => {
  return (
    <section className="relative py-10 px-4 sm:px-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 rounded-xl shadow-lg overflow-hidden">
      <HeadingTypeOne text="About Me" />
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12 xl:gap-16">
        <div className="bg-white/80 backdrop-blur-md rounded-xl  p-6 w-full lg:w-2/3">
          <p className="mb-6 text-base md:text-lg lg:text-[1.1rem] tracking-wide leading-relaxed text-gray-800">
            I'm Sahitya Neupane, a proactive and adaptable web developer with a
            passion for technology, problem-solving, and continuous learning. I
            recently graduated from the Interactive Media Design - Web program
            at Georgian College and am currently based in Richmond Hill, ON.
            <br />
            <br />
            I have hands-on experience in both front-end and back-end
            development, with a strong command of technologies like React,
            Angular, Node.js, and Python. I'm currently honing my skills in Data
            Structures and Algorithms using Python.
            <br />
            <br />
            I'm actively seeking new opportunities in Canada where I can apply
            my skills to create elegant and efficient solutions. I'm a
            collaborative team player with experience in Agile environments and
            a commitment to writing clean, maintainable, and well-tested code.
          </p>
          <div className="flex justify-start">
            <ButtonTypeOne
              text={"View My Resume"}
              color={"primary"}
              bgColor={"colorText"}
              link="/mycv.pdf"
              target={true}
            />
          </div>
        </div>
        <div className="relative flex-shrink-0 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[350px] lg:h-[400px] shadow-xl rounded-xl overflow-hidden border-2 ">
          <Image
            src={"/images/myimg.png"}
            alt="my-img"
            fill
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <BackgroundText
        text={"?"}
        style={{
          WebkitTextStroke: "2px rgb(var(--primary-clr))",
          opacity: "0.2",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-10deg)",
          zIndex: "1",
          pointerEvents: "none",
        }}
      />
    </section>
  );
};

export default AboutDescription;
