import { useState } from "react";
import InputItem from "../InputItem";

// props { styleClass[string] , title[string], type[string], data , placeholder[string],
// setValue[function]}

const FillItem = (props) => {
  const [errorMsg, setErrorMsg] = useState(props?.errorMsg || "");

  let setValue = (value) => {
    if (props.request) {
      if (value == "") {
        setErrorMsg("不能空著!");
      } else {
        setErrorMsg("");
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
          defaultValue={props?.defaultValue || null}
          error={errorMsg != ""}
          placeholder={props?.placeholder || null}
        />
        {/* {showPlaceholder && props?.placeholder ? (
          <div className="placeholder">{props.placeholder}</div>
        ) : null*/}
        {errorMsg != "" ? <div className="error">{errorMsg}</div> : null}
      </div>
    </div>
  );
};

export default FillItem;
