export const RadioGroup = (props) => {
  const datas = props.datas.map((data) => {
    return (
      <div key="">
        <p>
          {data.title}, gid = {data.tid.groupId}, id = {data.tid.id}, now ={" "}
          {data.content.val}
        </p>
      </div>
    );
  });

  return (
    <div className="radiogroup_item">
      {props?.title ? <div className="item_title">{props?.title}</div> : null}
      <div className="item_content">{datas}</div>
    </div>
  );
};

export default RadioGroup;
