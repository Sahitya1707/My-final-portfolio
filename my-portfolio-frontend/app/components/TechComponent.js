import React, { useRef } from "react";
import { ProjectHeading } from "./ProjectComponent";
import DashboardSecondHeading from "./DashboardSecondHeading";
import { Input } from "./Form";
import ButtonTypeOne from "./ButtonTypeOne";
import { backendURI } from "../utils/secret";

const TechComponent = () => {
  const form = useRef(null);
  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    // while sending the formData content type header should be of multiplate/form-data type in reques header
    const response = fetch(`${backendURI}/admin/data/tech/add`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
      credentials: "include",
    });
    // const data = await response.json();
    // console.log(...formData.entries());
    try {
    } catch (err) {}
  };
  return (
    <>
      <DashboardSecondHeading text={"Techs"} />
      <form
        action="
      "
        ref={form}
        className="w-[20rem]"
        onSubmit={submitForm}
      >
        <Input
          inputType={"file"}
          id={"techimage"}
          label={"Image."}
          placeholder={" "}
        />
        <Input
          inputType={"text"}
          id={"techName"}
          label={"Name"}
          placeholderText={"Add a Tech Name."}
        />
        <ButtonTypeOne
          text={"Submit"}
          bgColor={"colorText"}
          color={"primary"}
          handleClick={() => {}}
        />
      </form>
    </>
  );
};

export default TechComponent;
