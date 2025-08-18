import React, { useState } from "react";
import Description from "./Description";
import { Input, TextArea } from "./Form";
import ButtonTypeOne from "./ButtonTypeOne";
import handleMessage from "../actions/sendMessage";
import { backendURI } from "../utils/secret";
import { usePopupStatus } from "../utils/stores/popup";

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
      if (response.ok) {
        const data = await response.json();
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-2 py-8 w-full">
      <Description text="Looking to hire a passionate developer, need a standout website, or just want some help with your project? I’m here to help and always open to new opportunities. Drop me a message. I will get back to you asap. Let’s connect and make it happen!" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-colorNav border-colorText/20 border-2 p-4 sm:p-6 rounded-xl shadow-colorText/20 shadow-md mt-8"
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
          rows={2}
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
