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

    console.log("hi");
  };
  const [formValue, setFormValue] = useState({
    name: "",
  });
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
        action={handleSubmit}
        // method="post"
        className="flex flex-col w-[40rem] bg-colorNav border-colorText/20 border-solid border-2 p-5 rounded-xl my-10"
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
          rows={5}
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
