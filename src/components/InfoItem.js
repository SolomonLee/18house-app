const InfoItem = (props) => {
  let datas = [];
  props.content.forEach((data) => {
    datas.push(<p key={data}>{data}</p>);
  });

  return (
    <div className="info_item">
      {props?.title ? <div className="item_title">{props.title}</div> : null}
      <div className="item_content">{datas}</div>
    </div>
  );
};

export default InfoItem;
