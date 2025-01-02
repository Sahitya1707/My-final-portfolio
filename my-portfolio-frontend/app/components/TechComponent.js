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
    console.log(e);

    const formData = new FormData(form.current);
    console.log(...formData.entries());

    // while sending the formData content type header should be of multiplate/form-data type in reques header
    const response = fetch(`${backendURI}/admin/data/tech/add`, {
      method: "POST",

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
        encType="multipart/form-data"
        ref={form}
        className="w-[20rem]"
        onSubmit={submitForm}
      >
        <Input
          inputType={"file"}
          id={"techimage"}
          label={"Image"}
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
          bgColor={"colorNav"}
          color={"primary"}
          handleClick={() => {}}
        />
      </form>
    </>
  );
};

export default TechComponent;
