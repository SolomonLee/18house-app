import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import Banner from "../Banner";
import SlideList from "../combo/SlideList";
import Loading, { setLoadingPromise } from "../Loading";

import { getBanner, getHomeShowCase } from "../../apis/apiContent";
import { getHomeShowCase_SlideList } from "../../adapters/atContent";

const PageHome = (props) => {
  const [banner, setBanner] = useState([]);
  const [showCase, setShowCase] = useState([]);
  const [onloading, setOnloading] = useState(true);

  useEffect(() => {
    setOnloading(true);

    // LOAD DATA
    let _isMounted = true;
    setLoadingPromise(
      [
        getBanner("Home").then((_banner) => {
          if (_isMounted) setBanner(_banner);
        }),
        getHomeShowCase().then((_showCase) => {
          if (_isMounted) setShowCase(getHomeShowCase_SlideList(_showCase));
        }),
      ],
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      },
      () => {
        _isMounted ? setOnloading(false) : null;
      }
    );

    return () => (_isMounted = false);
  }, []);

  return (
    <div className="content PageHome">
      <Loading loading={onloading} />
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
