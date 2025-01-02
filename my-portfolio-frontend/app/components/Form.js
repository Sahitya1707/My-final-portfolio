// This will contain all the form input, textarea

import { useState } from "react";
import { Icon } from "./Header";
export const Input = ({
  label,
  inputType,
  placeholderText,
  inputRequired,
  handleInput,
  value,
}) => {
  return (
    <>
      <label
        htmlFor={label}
        className="capitalize text-md tracking-wider  font-semibold mt-5 text-colorText"
      >
        {label}
      </label>

      <input
        id={label}
        value={value}
        type={inputType}
        onChange={handleInput}
        placeholder={`${placeholderText}`}
        className={` text-colorText p-2  rounded-sm w-full outline-primary border-2 border-primary/50 outline-2 color-primary bg-colorBody`}
        name={label}
        autoComplete="fill"
        required
      />
    </>
  );
};

export const TextArea = ({ label, placeholderText, rows, value }) => {
  return (
    <>
      <label
        htmlFor={label}
        name={label}
        className="capitalize text-md tracking-wider  font-semibold mt-4"
      >
        {label}
      </label>
      <textarea
        rows={rows}
        value={value}
        id={label}
        placeholder={`${placeholderText}`}
        className="text-[black]  p-2  rounded-sm w-full focus:outline-primary"
        required
      />
    </>
  );
};
