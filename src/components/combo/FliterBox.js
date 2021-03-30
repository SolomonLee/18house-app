import { useEffect, useRef } from "react";

import CollapseItem from "../CollapseItem";
import RadioGroup from "./RadioGroup";

export const FliterBox = (props) => {
  if (!props?.datas || !Array.isArray(props.datas)) return null;
  const _datas = [...props.datas];

  const keys = props.tkey + "_collapse";
  let i = 0;
  const content = _datas.map((data) => {
    i++;
    return (
      <CollapseItem
        key={keys + i.toString()}
        title={data.title}
        datas={
          <RadioGroup
            tkey={keys + i.toString() + "_"}
            orgdatas={_datas}
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
