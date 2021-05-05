const Split = (props) => {
  return (
    <div className="split_item">
      {props?.content ? (
        <div className="item_content">
          <span>{props.content}</span>
        </div>
      ) : null}
    </div>
  );
};

export default Split;
