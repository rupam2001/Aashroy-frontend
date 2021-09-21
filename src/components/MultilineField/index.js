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

const TextField = ({ placeholder, containerClass, state }) => {
  return (
    <div className={containerClass}>
      <textarea
        placeholder={placeholder}
        className="rounded shadow-md px-4 py-3 w-full outline-none"
        multiple={true}
        value={state[0]}
        onChange={(e) => {
          state[1](e.target.value);
        }}
      />
    </div>
  );
};

export default TextField;
