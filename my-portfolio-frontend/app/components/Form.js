// This will contain all the form input, textarea

import { useState } from "react";
import { Icon } from "./Header";
export const Input = ({
  label,
  inputType,
  placeholderText,
  inputRequired,
  handleInput,
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
        type={inputType}
        onChange={handleInput}
        placeholder={`${placeholderText}`}
        className={` text-[black] p-2  rounded-sm w-full focus:outline-primary `}
        name={label}
        autoComplete="fill"
        required
      />
    </>
  );
};

export const TextArea = ({ label, placeholderText, rows }) => {
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
        id={label}
        placeholder={`${placeholderText}`}
        className="text-[black]  p-2  rounded-sm w-full focus:outline-primary"
        required
      />
    </>
  );
};
