const Fill2Item = (props) => {
  return (
    <div className="fill2_item" error={props?.error ? "" : null}>
      {props?.title ? <div className="item_title">{props.title}</div> : null}
      <div className="item_input">
        {props?.placeholder && props.value === "" ? (
          <div className="placeholder">{props.placeholder}</div>
        ) : null}
        <input
          name={props.name}
          type={props.type}
          value={props.value}
          onChange={props.onchange}
          onBlur={props.onblur}
        />
        {props?.error && props.error != "" ? (
          <div className="error">{props?.error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Fill2Item;
