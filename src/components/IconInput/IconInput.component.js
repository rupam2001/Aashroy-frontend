import React, { useEffect, useRef, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";

const IconInput = ({
  onChangeText,
  placeholder,
  textClass,
  addedClass,
  isEditable,
  isLink,
}) => {
  const [showIcon, setShowIcon] = useState(true);
  const [value, setValue] = useState(placeholder);
  const inputRef = useRef(null);

  const makeInputOn = () => {
    // inputRef.current.contentEditable = true;
    // inputRef.current.focus();
  };
  const makeInputOff = () => {
    // inputRef.current.contentEditable = false;
  };
  useEffect(() => {
    setValue(placeholder);
  }, [placeholder]);
  return (
    <div className="flex justify-center max-w-max items-center">
      {showIcon && (
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
        >
          {isLink ? (
            <a href={prepareUrl(value)} target="_blank">
              {value}
            </a>
          ) : (
            value
          )}
        </h2>
      )}

      {!showIcon && (
        <input
          className={
            textClass ||
            "text-lg mr-2 focus:outline-none px-1 py-1" + ` ${addedClass || ""}`
          }
          ref={inputRef}
          onBlur={() => {
            setShowIcon(true);
            makeInputOff();
          }}
          value={placeholder}
          onChange={(e) => onChangeText(e.target.value)}
          autoFocus={true}
        />
      )}
      {showIcon && isEditable && (
        <HiOutlinePencilAlt
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

const prepareUrl = (website) => {
  /**
   * IF the website string dosnot vcontains the standar https protocol, add it
   */
  if (website?.search("https://") == -1) {
    return "https://" + website;
  }
  return website;
};
