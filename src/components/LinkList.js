import { Link } from "react-router-dom";
import classNames from "classnames";

// props { styleClass[string] , title[string], datas[obj]{ url[string], content[string]}}
const LinkList = (props) => {
  let datas = props.datas.map((data) => {
    if (props?.tkey) {
      return (
        <li key={props.tkey + data.content}>
          <Link to={data.url}>{data.content}</Link>
        </li>
      );
    } else if (data?.tkey) {
      return (
        <li key={data.tkey}>
          <Link to={data.url}>{data.content}</Link>
        </li>
      );
    }
  });

  let _objClassName = { list_item: true };
  props?.styleClass ? (_objClassName[props.styleClass] = true) : null;

  return (
    <div className={classNames(_objClassName)}>
      {props?.title ? <div className="item_title">{props.title}</div> : null}
      <div className="item_content">
        <ul>{datas}</ul>
      </div>
    </div>
  );
};

export default LinkList;
