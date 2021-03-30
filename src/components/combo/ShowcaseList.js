import ShowcaseItem from "../ShowcaseItem";
import Loading from "../Loading";

export const ShowcaseList = (props) => {
  let i = 0;
  const datas = props.datas.map((data) => {
    i++;
    const key = props.tkey + "_ShowcaseItem_" + i.toString();
    return (
      <ShowcaseItem
        key={key}
        title={data.title}
        subTitle={data.subTitle}
        imgUrl={data.img}
        imgAlt={data.imgAlt}
        url={data.url}
      />
    );
  });

  return (
    <div className="showcase_box">
      <Loading loading={props.onloading} />
      {props?.title ? <div className="box_title">{props?.title}</div> : null}
      <div className="box_content">{props.onloading ? null : datas}</div>
    </div>
  );
};

export default ShowcaseList;
