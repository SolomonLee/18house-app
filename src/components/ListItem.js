import classNames from "classnames";

// props { styleClass[string] , title[string], datas[obj]{ content[string]}}
const ListItem = (props) => {
  if (props?.datas == undefined) return null;

  console.log("props?.datas", props?.datas);
  let datas = props.datas.map((data) => {
    if (typeof data === "string") {
      if (props?.tkey) return <li key={props.tkey + data}>{data}</li>;
      return <li key={data}>{data}</li>;
    } else {
      if (props?.tkey) {
        return <li key={props.tkey + data.content}>{data.content}</li>;
      } else if (data?.tkey) {
        return <li key={data.tkey}>{data.content}</li>;
      }
    }
  });

  return (
    <div className="list_item" stylenum={props?.styleClass}>
      {props?.title ? <div className="item_title">{props.title}</div> : null}
      <div className="item_content">
        <ul>{datas}</ul>
      </div>
    </div>
  );
};

export default ListItem;
