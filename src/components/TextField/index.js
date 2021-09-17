import React from "react";

/*
 *  Properties:
 *
 *  state: array retured by the funtion React.useState(initialvalue)
 *  placeholder: text
 *  containerClass: mainly to enter style classes
 *
 *  example:
 *      const [name, setName] = React.useState("James Bond")
 *      <TextField
 *          state={[name, setName]}
 *          placeholder="Enter name"
 *          containerClass="margin-bottom-12"
 *      />
 *
 */

const TextField = ({ placeholder, containerClass, state, head }) => {
  return (
    <div
      className={`rounded shadow-md w-full bg-white flex justify-between ${containerClass}`}
    >
      {head ? (
        <div className="flex justify-center flex-col pl-4 pr-3 select-none">
          {head}
        </div>
      ) : null}
      <input
        placeholder={placeholder}
        className="px-4 py-3 w-full"
        value={state[0]}
        onChange={(e) => {
          state[1](e.target.value);
        }}
      />
    </div>
  );
};

export default TextField;
