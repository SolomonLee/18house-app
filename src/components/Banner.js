import { Link } from "react-router-dom";

const Banner = (props) => {
  const datas = props.datas.map((data) => {
    if (data?.url) {
      return (
        <li key={props.tKey + data.imgAlt}>
          <Link to={data.url}>
            <img src={data.imgUrl} alt={data.imgAlt} />
          </Link>
        </li>
      );
    } else {
      return (
        <li key={props.tKey + data.imgAlt}>
          <img src={data.imgUrl} alt={data.imgAlt} />
        </li>
      );
    }
  });

  return (
    <div className="banner_box">
      <div className="box_content">
        <ul className="datas">
          {datas}
          {/* <li>
            <div className="data_box">
              <div className="box_title">
                <img src="/img/banner.jpg" alt="" />
              </div>
              <div className="box_content">
                <h1>NEW COLLECTION</h1>
                <button className="btn btn_style1">Shop Now</button>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
      <div className="box_bottom">
        <div className="control">
          <div className="left_n_right">
            <button className="btn btn_style_none btn_left">
              <span className="oi oi-chevron-left"></span>
            </button>
            <button className="btn btn_style_none btn_right">
              <span className="oi oi-chevron-right"></span>
            </button>
          </div>
          <div className="pagertion">
            <button className="btn btn_style_none"></button>
            <button className="btn btn_style_none"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
