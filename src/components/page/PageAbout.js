import { useState, useEffect } from "react";

import Banner from "../Banner";
import ListItem from "../ListItem";
import Loading, { setLoadingPromise } from "../Loading";

import { getBanner, getAboutInfo } from "../../apis/apiContent";

const PageAbout = (props) => {
  const [banner, setBanner] = useState([]);
  const [aboutInfo, setAboutInfo] = useState({});
  const [onloading, setOnloading] = useState(true);

  useEffect(() => {
    // LOAD DATA
    let _isMounted = true;
    setLoadingPromise(
      [
        getBanner("about").then((_banners) => {
          if (_isMounted) setBanner(_banners);
        }),
        getAboutInfo().then((_aboutInfo) => {
          if (_isMounted) setAboutInfo(_aboutInfo);
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
    <div className="content PageAbout">
      <Loading loading={onloading} />
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
