import React, { useState } from "react";
import Description from "./Description";
import { Input, TextArea } from "./Form";
import ButtonTypeOne from "./ButtonTypeOne";

import handleMessage from "../actions/sendMessage";
import { backendURI } from "../utils/secret";
import { usePopupStatus } from "../utils/stores/popup";

// TODO temporarily i am swithing to using my own mail as dns was not changes, i wanted to make it hello@sahityaneupane.com.np btw.

const ContactComponent = () => {
  const updatePopupContent = usePopupStatus(
    (state) => state.updatePopupContent
  );
  const updatePopupStatusForm = usePopupStatus(
    (state) => state.updatePopupStatus
  );
  const updateSuccessMessageIcon = usePopupStatus(
    (state) => state.updateSuccessMessageIcon
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
    agree: null,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.agree);
    if (formData.agree) {
      updatePopupContent(
        "Sorry form didnot submitted ! Try again after reloading"
      );
      updatePopupStatusForm(true);
      updateSuccessMessageIcon(false);

      return;
    }
    try {
      const response = await fetch(`${backendURI}/contact/send`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // const data = await response;
        // console.log(data);
        updatePopupContent(data.message);
        updatePopupStatusForm(data.success);
        updateSuccessMessageIcon(data.success);

        setFormData({
          name: "",
          email: "",
          message: "",
          number: "",
          agree: null,
        });
      }
    } catch (err) {
      console.log(err.message);
      updatePopupContent(
        "Sorry form didnot submitted ! Try again after reloading"
      );
      updatePopupStatusForm(true);
      updateSuccessMessageIcon(false);
    }
  };

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        onSubmit={handleSubmit}
        action={""}
        className="flex flex-col w-[100%] md:w-[30rem] lg:w-[40rem] xl:w-[35rem]  bg-colorNav border-colorText/20 border-solid border-2 p-3 sm:p-2 rounded-md sm:rounded-xl shadow-colorText/20 shadow-md  sm:mt-[5rem] my-4 lg:mt-3"
      >
        <Input
          inputType="text"
          placeholderText={"Enter Your Name"}
          label={"name"}
          value={formData.name}
          handleInput={handleForm}
        />
        <Input
          inputType="email"
          placeholderText={"Enter Your Email"}
          label={"email"}
          value={formData.email}
          handleInput={handleForm}
        />
        <Input
          inputType="number"
          placeholderText={"Enter Your Phone Number"}
          label={"number"}
          value={formData.number}
          handleInput={handleForm}
        />
        <TextArea
          label={"message"}
          placeholderText={"Enter Your Message"}
          rows={3}
          value={formData.message}
          handleTextArea={handleForm}
        />
        {/* honeyport form to track spam */}
        <input
          type="checkbox"
          name="agree"
          hidden
          onChange={handleForm}
        ></input>
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
