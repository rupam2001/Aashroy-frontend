import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

/*
 *  Properties:
 *
 *  state: array retured by the funtion React.useState(initialvalue)
 *  placeholder: text
 *  containerClass: mainly to enter style classes
 *
 *  example:
 *      const [password, setPassword] = React.useState("James Bond")
 *      <PasswordField
 *          state={[password, setPassword]}
 *          placeholder="Enter password"
 *          containerClass="margin-bottom-12"
 *      />
 *
 */

const PasswordField = ({ placeholder, containerClass, state }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`rounded shadow-md w-full bg-white flex justify-between ${containerClass}`}
    >
      <input
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        className="px-4 py-3 w-5/6"
        value={state[0]}
        onChange={(e) => {
          state[1](e.target.value);
        }}
      />
      <div
        className="flex justify-center flex-col px-4 cursor-pointer select-none"
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? (
          <HiOutlineEyeOff size={24} color="grey" />
        ) : (
          <HiOutlineEye size={24} color="grey" />
        )}
      </div>
    </div>
  );
};

export default PasswordField;
