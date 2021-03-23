import ShowcaseItem from "../ShowcaseItem";

function SlideList(props) {
  const porducts = props.datas.map((data) => {
    switch (data.type) {
      case "Showcase":
        return (
          <ShowcaseItem
            key={props.tkey + data.title}
            title={data.title}
            subTitle={data.subTitle}
            imgUrl={data.imgUrl}
            imgAlt={data.imgAlt}
            url={data.url}
          />
        );
    }
  });

  return (
    <div className="slide_list_box">
      {props?.title ? <div className="box_title">{props.title}</div> : null}
      <div className="box_content">{porducts}</div>
      <div className="box_bottom">
        <div className="slide_control"></div>
      </div>
    </div>
  );
}

export default SlideList;
