"use client";
import React, { useState } from "react";
import Description from "./Description";
import { Input, TextArea } from "./Form";
import ButtonTypeOne from "./ButtonTypeOne";

const ContactComponent = () => {
  const handleSubmit = (formData) => {
    // e.preventDefault();
    // why not use State for form
    // https://medium.com/@TheKalpit/stop-using-usestate-for-form-data-ce5cc9a4ce93
    // const formData = new FormData(e.currentTarget);
    console.log(formData.get("name"));
    // console.log(e.currentTarget);
    console.log(formData.entries());
  };

  return (
    <div className="flex justify-center items-center lg:justify-start md:justify-center mt-0 sm:mt-16 flex-col lg:h-full  px-0 w-[100%] xl:w-[80%]  mx-auto min-h-[inherit] md:mt-2 ">
      <Description
        text="   
        Looking to hire a passionate developer, need a standout website, or just
        want some help with your project? I’m here to help and always open to
        new opportunities. Drop me a message. I will get back to you asap.  Let’s connect and make it happen! 
      "
      />
      <form
        action={handleSubmit}
        // method="post"
        className="flex flex-col w-[100%] md:w-[30rem] lg:w-[40rem] xl:w-[35rem]  bg-colorNav border-colorText/20 border-solid border-2 p-3 sm:p-5 rounded-md sm:rounded-xl shadow-colorText/20 shadow-md  sm:mt-[5rem] my-4"
      >
        <Input type="text" placeholderText={"Enter Your Name"} label={"name"} />
        <Input
          type="email"
          placeholderText={"Enter Your Email"}
          label={"email"}
        />
        <TextArea
          label={"message"}
          placeholderText={"Enter Your Message"}
          rows={4}
        />
        <ButtonTypeOne
          color={"colorText"}
          bgColor={"primary"}
          text={"Submit"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default ContactComponent;
