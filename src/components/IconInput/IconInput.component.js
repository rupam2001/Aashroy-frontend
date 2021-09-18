import React, { useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";

const IconInput = ({ onChangeText, placeholder, textClass, addedClass }) => {
  const [showIcon, setShowIcon] = useState(true);
  const [value, setValue] = useState(placeholder);
  const inputRef = useRef(null);

  const makeInputOn = () => {
    inputRef.current.contentEditable = true;
    inputRef.current.focus();
  };
  const makeInputOff = () => {
    inputRef.current.contentEditable = false;
  };
  useEffect(() => {
    setValue(placeholder);
  }, [placeholder]);
  useEffect(() => {
    // const handleEnterPress = (e) => {
    //   if (e.keyCode == 13) {
    //     makeInputOff();
    //   }
    // };
    // window.addEventListener("keyup", handleEnterPress);
    // return () => window.removeEventListener("keyup", handleEnterPress);
  });
  return (
    <div className="flex justify-center max-w-max items-center">
      <h2
        className={
          textClass ||
          "text-lg mr-2 focus:outline-none px-1 py-1" + ` ${addedClass || ""}`
        }
        ref={inputRef}
        onBlur={() => {
          setShowIcon(true);
          makeInputOff();
        }}
        onChange={(e) => onChangeText(e.target.value)}
      >
        {value}
      </h2>
      {showIcon && (
        <FaEdit
          className="text-gray-400 text-lg cursor-pointer"
          onClick={() => {
            setShowIcon(false);
            makeInputOn();
          }}
        />
      )}
    </div>
  );
};
export default IconInput;
