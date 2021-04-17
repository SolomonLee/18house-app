import RadioItem from "../RadioItem";
import { useState } from "react";

export const RadioGroup = (props) => {
  const [groupvalue, setGroupvalue] = useState(props?.defualt || "");

  const datas = props.opts.map((opt, index) => {
    const _setValue = (val) => {
      if (val == groupvalue) return;

      setGroupvalue(val);

      if (props?.groupname) props.onchange(props.groupname, val);
      else props.onchange(val);
    };

    return (
      <RadioItem
        key={props.tkey + "Radio_group_" + index.toString()}
        content={opt.title}
        value={opt.val}
        groupvalue={groupvalue}
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
