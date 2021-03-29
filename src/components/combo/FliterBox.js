import { useEffect, useRef } from "react";

import CollapseItem from "../CollapseItem";
import RadioGroup from "./RadioGroup";

export const FliterBox = (props) => {
  if (!props?.datas || !Array.isArray(props.datas)) return null;
  const setValueList = useRef([]);

  useEffect(() => {
    setValueList.current = [];
  }, [props.datas]);

  let i = 0;
  console.log(props.datas);
  const content = props.datas.map((data) => {
    i++;
    return (
      <CollapseItem
        key={props.tkey + "collapse" + (i++).toString()}
        title={data.title}
        datas={
          <RadioGroup
            orgdatas={props.datas}
            datas={data.content}
            setValue={props.setValue}
          />
        }
      />
    );
  });

  return (
    <div className="filter_box">
      <div className="box_title">篩選</div>
      <div className="box_content">{content}</div>
    </div>
  );
};

export default FliterBox;
