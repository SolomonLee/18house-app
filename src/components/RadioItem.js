import React, { useState } from "react";
import classNames from "classnames";

const inputTypes = ["text", "number", "password", "radio", "checkBox"];

const InputItem = (props) => {
  const [showPlaceholder, setShowPlaceholder] = useState(
    props?.placeholder ? (props?.defaultValue ? false : true) : false
  );

  if (!props?.type) return null;

  const handlerChange = (e) => {
    if (e.target.value == "") setShowPlaceholder(true);
    props.setValue?.(e.target.value);
  };

  return (
    <div className="input_item" error={props?.error}>
      <div className="item_content">
        {inputTypes.includes(props.type) ? (
          <input
            type={props.type}
            onChange={handlerChange}
            defaultValue={props?.defaultValue ? props.defaultValue : ""}
          />
        ) : props.type == "textArea" ? (
          <textarea onChange={handlerChange}>
            {props?.defaultValue ? props.defaultValue : null}
          </textarea>
        ) : null}
        {showPlaceholder ? (
          <div className="placeholder">{props.placeholder}</div>
        ) : null}
      </div>
    </div>
  );
};

export default InputItem;
