import { Link } from "react-router-dom";

const ShowcaseItem = (props) => {
  return (
    <div className="showcase_item">
      <div className="item_title">
        <img src={props.imgUrl} alt={props.imgAlt} />
      </div>
      <div className="item_content">
        <p className="title">{props.title}</p>
        <p className="sub_title">{props.subTitle}</p>
      </div>
      {props?.url ? (
        <div className="item_bottom">
          <Link to={props.url}>
            <button className="btn btn_style2">詳細</button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default ShowcaseItem;
