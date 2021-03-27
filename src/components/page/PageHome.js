import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Banner from "../Banner";
import SlideList from "../combo/SlideList";

import { getBanner, getHomeShowCase } from "../../apis/apiContent";
import { getHomeShowCase_SlideList } from "../../adapters/atContent";

const PageHome = (props) => {
  const [banner, setBanner] = useState([]);
  const [showCase, setShowCase] = useState([]);

  useEffect(() => {
    getBanner("Home").then(
      (_banner) => {
        setBanner(_banner);
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );

    getHomeShowCase().then(
      (_showCase) => {
        setShowCase(getHomeShowCase_SlideList(_showCase));
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );
  }, []);

  return (
    <div className="content PageHome">
      <div className="container-fluid">
        <div className="row">
          <div className="w-100">
            <Banner datas={banner} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <SlideList title="展示區一" datas={showCase} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Link to="/Album">
              <button className="btn btn_style1">Show All</button>
            </Link>
          </div>
        </div>

        {/* <h2 className="content_title">展示區1</h2>
        <PorductListHorizontal
          products={products}
          tkey="HomePorductListHorizontal"
        /> */}
      </div>
    </div>
  );
};

export default PageHome;
