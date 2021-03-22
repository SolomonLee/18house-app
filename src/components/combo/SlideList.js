import ShowcaseItem from "../ShowcaseItem";

function SlideList(props) {
  const porducts = props.datas.map((data) => {
    switch (data.type) {
      case "Showcase":
        console.log(data.url);
        console.log(data.url);
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
      {props?.listName ? (
        <div className="box_title">{props.listName}</div>
      ) : null}
      <div className="box_content">{porducts}</div>
      <div className="box_bottom">
        <div className="slide_control"></div>
      </div>
    </div>
  );
}

export default SlideList;
