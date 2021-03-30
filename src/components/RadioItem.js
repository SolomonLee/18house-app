const RadioItem = (props) => {
  const handlerChange = () => {
    props.setValue?.(props.value);
  };

  return (
    <div className="radio_item">
      <div className="item_content">
        <input
          type="radio"
          onChange={handlerChange}
          checked={props.value == props.groupvalue.val}
        />
        <span>{props.content}</span>
      </div>
    </div>
  );
};

export default RadioItem;
