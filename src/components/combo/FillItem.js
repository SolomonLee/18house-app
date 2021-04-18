import { useState } from "react";
import InputItem from "../InputItem";

// props { styleClass[string] , title[string], type[string], data , placeholder[string],
// defaultValue[string], setValue[function]}

const FillItem = (props) => {
  const [errorMsg, setErrorMsg] = useState(props?.errorMsg || "");
  const [showPlaceholder, setShowPlaceholder] = useState(
    props?.placeholder ? (props?.defaultValue ? false : true) : false
  );

  let setValue = (value) => {
    if (props.request) {
      if (value == "") {
        setErrorMsg("不能空著!");
        setShowPlaceholder(true);
      } else {
        setErrorMsg("");
        setShowPlaceholder(false);
      }
    } else {
      if (value == "") {
        setShowPlaceholder(true);
      } else {
        setShowPlaceholder(false);
      }
    }
    props.setValue?.(value);
  };

  return (
    <div className="fill_item" stylenum={props?.styleClass}>
      {props?.title ? <div className="item_title">{props.title}</div> : null}
      <div className="item_content">
        <InputItem
          type={props.type}
          value={props?.value || null}
          setValue={setValue}
          defaultValue={props.defaultValue}
          error={errorMsg != ""}
        />
        {showPlaceholder && props?.placeholder ? (
          <div className="placeholder">{props.placeholder}</div>
        ) : null}
        {errorMsg != "" ? <div className="error">{errorMsg}</div> : null}
      </div>
    </div>
  );
};

export default FillItem;
