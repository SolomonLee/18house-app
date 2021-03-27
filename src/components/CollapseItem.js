import { useState } from "react";

import classNames from "classnames";

// props { styleClass[string] , title[string], datas}
const CollapseItem = (props) => {
  if (props?.datas == undefined) return null;

  const [collapseIsOpen, setCollapseIsOpen] = useState(
    props?.defualtCollapse || false
  );
  const [objClassNames, setObjClassName] = useState({ collapse_item: true });

  props?.styleClass
    ? setObjClassName({ collapse_item: true, [props.styleClass]: true })
    : null;

  const handlerCollapse = () => {
    setCollapseIsOpen(!collapseIsOpen);
  };

  return (
    <div className={classNames(objClassNames)}>
      <div className="item_title" onClick={handlerCollapse}>
        {props?.title || null}
      </div>
      <div className="item_content">{props.datas}</div>
    </div>
  );
};

export default CollapseItem;
