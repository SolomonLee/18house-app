import ShowcaseItem from "../ShowcaseItem";
// import Loading from "../Loading";

export const ShowcaseList = (props) => {
  const datas = props.datas.map((data, index) => {
    const key = props.tkey + "_ShowcaseItem_" + index.toString();
    return (
      <ShowcaseItem
        key={key}
        title={data.title}
        subTitle={data.subTitle}
        imgUrl={data.imgUrl}
        imgAlt={data.imgAlt}
        pid={data.pid}
      />
    );
  });

  return (
    <div className="showcase_box">
      {props?.title ? <div className="box_title">{props?.title}</div> : null}
      <div className="box_content">{datas}</div>
    </div>
  );
};

export default ShowcaseList;
