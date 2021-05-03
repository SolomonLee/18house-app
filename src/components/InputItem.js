const inputTypes = ["text", "number", "password", "radio", "checkBox"];

const InputItem = (props) => {
  if (!props?.type) return null;

  const handlerChange = (e) => {
    props.setValue?.(e.target.value);
  };

  return (
    <div className="input_item" iserror={props?.error ? "" : null || null}>
      {inputTypes.includes(props.type) ? (
        <input
          type={props.type}
          onChange={handlerChange}
          value={props?.value ? props.value : ""}
        />
      ) : props.type == "textArea" ? (
        <textarea
          onChange={handlerChange}
          value={props?.value ? props.value : ""}
        />
      ) : null}
      {!props?.value || props.value == "" ? (
        props?.placeholder ? (
          <div className="placeholder">{props.placeholder}</div>
        ) : null
      ) : null}
    </div>
  );
};

export default InputItem;
