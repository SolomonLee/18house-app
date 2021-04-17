import { useState } from "react";

// props { styleClass[string] , title[string], datas}
const CollapseItem = (props) => {
  if (props?.children == undefined) return null;

  const [collapseIsOpen, setCollapseIsOpen] = useState(
    props?.defualtCollapse || false
  );

  const handlerCollapse = () => {
    setCollapseIsOpen(!collapseIsOpen);
  };

  return (
    <div
      className="collapse_item"
      stylenum={props?.styleClass}
      isopen={collapseIsOpen ? "" : null}
    >
      <div className="item_title" onClick={handlerCollapse}>
        {props?.title || null}
      </div>
      <div className="item_content">{props.children}</div>
    </div>
  );
};

export default CollapseItem;
