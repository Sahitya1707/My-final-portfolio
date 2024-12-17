"use client";
import React from "react";
import Description from "./Description";
import { Input, TextArea } from "./Form";

const ContactComponent = () => {
  return (
    <div className="flex items-center justify-center flex-col h-full px-20 w-[80%]  mx-auto">
      <Description
        text="   
        Looking to hire a passionate developer, need a standout website, or just
        want some help with your project? I’m here to help and always open to
        new opportunities. Let’s connect and make it happen!
      "
      />
      <form
        action="post"
        className="flex flex-col w-[30rem] bg-colorNav border-colorText/20 border-solid border-2 p-5 rounded-xl my-5"
      >
        <Input type="text" placeholderText={"Enter Your Name"} label={"name"} />
        <Input
          type="email"
          placeholderText={"Enter Your Email"}
          label={"email"}
        />
        <TextArea label={"message"} placeholderText={"Enter Your Message"} />
      </form>
    </div>
  );
};

export default ContactComponent;
