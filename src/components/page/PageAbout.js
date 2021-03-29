import { useState, useEffect } from "react";

import Banner from "../Banner";
import ListItem from "../ListItem";

import { getBanner, getAboutInfo } from "../../apis/apiContent";

const PageAbout = (props) => {
  const [banner, setBanner] = useState([]);
  const [aboutInfo, setAboutInfo] = useState({});

  useEffect(() => {
    // LOAD DATA
    let _isMounted = true;

    getBanner("About").then(
      (_banners) => {
        if (_isMounted) setBanner(_banners);
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );

    getAboutInfo().then(
      (_aboutInfo) => {
        if (_isMounted) setAboutInfo(_aboutInfo);
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );
    return () => (_isMounted = false);
  }, []);

  return (
    <div className="content PageAbout">
      <div className="container-fluid">
        <div className="row">
          <div className="w-100">
            <Banner datas={banner} objectFit="cover" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="_box">
              <div className="box_title">{aboutInfo.title}</div>
              <div className="box_content">
                <ListItem datas={aboutInfo.contents} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
