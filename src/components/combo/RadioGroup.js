import RadioItem from "../RadioItem";

export const RadioGroup = (props) => {
  let i = 0;
  const datas = props.datas.map((data) => {
    const _setValue = (id) => {
      data.content.val = id;
      props.setValue(props.orgdatas);
    };

    i++;
    return (
      <RadioItem
        key={props.tkey + "Radio_group_" + i.toString()}
        content={data.title}
        value={data.id}
        groupvalue={data.content}
        setValue={_setValue}
      />
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
