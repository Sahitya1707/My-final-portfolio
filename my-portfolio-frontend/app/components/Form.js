// This will contain all the form input, textarea

export const Input = ({ label, inputType, placeholderText }) => {
  const handleInput = () => {};
  return (
    <>
      <label
        htmlFor={label}
        className="capitalize text-lg tracking-wider  font-semibold mt-4"
      >
        {label}
      </label>
      <input
        id={label}
        type={inputType}
        onChange={handleInput}
        placeholder={`${placeholderText}`}
        className="text-[yellow] p-2 my-2 rounded-sm w-full"
      />
    </>
  );
};

export const TextArea = ({ label, placeholderText }) => {
  return (
    <>
      <label
        htmlFor={label}
        className="capitalize text-lg tracking-wider  font-semibold mt-4"
      >
        {label}
      </label>
      <textarea
        id={label}
        placeholder={`${placeholderText}`}
        className="text-[yellow] p-2 my-2 rounded-sm w-full"
      />
    </>
  );
};
