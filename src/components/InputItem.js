import React, { useState } from "react";
import classNames from "classnames";

const InputItem = (props) => {
  const [showPlaceholder, setShowPlaceholder] = useState(
    props?.placeholder ? (props?.defaultValue ? false : true) : false
  );

  if (!props?.type) return null;

  const handlerChange = (e) => {
    if (e.target.value == "") setShowPlaceholder(true);
    props.setValue?.(e.target.value);
  };

  const objClassNames = {
    input_item: true,
    error: props?.error || false,
  };

  return (
    <div className={classNames(objClassNames)}>
      <div className="item_content">
        <input
          type={props.type}
          onChange={handlerChange}
          defaultValue={props?.defaultValue ? props.defaultValue : ""}
        />
        {showPlaceholder ? (
          <div className="placeholder">{props.placeholder}</div>
        ) : null}
      </div>
    </div>
  );
};

export default InputItem;
