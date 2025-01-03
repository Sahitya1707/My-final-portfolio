import React, { useRef } from "react";
import { ProjectHeading } from "./ProjectComponent";
import DashboardSecondHeading from "./DashboardSecondHeading";
import { Input } from "./Form";
import ButtonTypeOne from "./ButtonTypeOne";
import { backendURI } from "../utils/secret";
import { usePopupStatus } from "../utils/stores/popup";

const TechComponent = () => {
  const updatePopupContent = usePopupStatus(
    (state) => state.updatePopupContent
  );
  const updatePopupStatusForm = usePopupStatus(
    (state) => state.updatePopupStatus
  );
  const updateSuccessMessageIcon = usePopupStatus(
    (state) => state.updateSuccessMessageIcon
  );

  const form = useRef(null);
  const input = useRef(null);
  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    // console.log(...formData.entries());
    try {
      const response = await fetch(`${backendURI}/admin/data/tech/add`, {
        method: "POST",
        headers: {
          Accept:
            "application/json, application/xml, text/plain, text/html, *.*",
        },
        body: formData,
        credentials: "include",
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        updatePopupStatusForm(true);
        updateSuccessMessageIcon(data.status);
        updatePopupContent(data.message);

        e.target[0].value = null;
      }

      // const data = await response.json();
      // console.log(data);
    } catch (err) {
      console.log(err);
      updatePopupStatusForm(false);
      updateSuccessMessageIcon(false);
      updatePopupContent("error");
    }
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
