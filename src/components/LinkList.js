import { Link } from "react-router-dom";

// props { styleclass[string] , title[string], datas[obj]{ url[string], content[string]}}
const LinkList = (props) => {
  let datas = null;
  if (props?.datas) {
    datas = props?.datas.map((data) => {
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
  }

  return (
    <div className="list_item" stylenum={props?.styleclass}>
      {props?.title ? <div className="item_title">{props.title}</div> : null}
      <div className="item_content">
        <ul>
          {datas}
          {props.children}
        </ul>
      </div>
    </div>
  );
};

export default LinkList;
