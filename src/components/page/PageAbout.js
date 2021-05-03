import { useState, useEffect } from "react";

import Banner from "../Banner";
import ListItem from "../ListItem";
import Loading, { setLoadingPromise } from "../Loading";

import { getBanner, getAboutInfo } from "../../apis/apiContent";

import { storage, initSession } from "../../common/sessionStorageExtend";

initSession({
  banner: "PageAboutFiexDataBanner",
  aboutInfo: "PageAboutFiexDataAboutInfo",
});

const PageAbout = (props) => {
  const [banner, setBanner] = useState(storage.banner.get());
  const [aboutInfo, setAboutInfo] = useState(storage.aboutInfo.get());
  const [onloading, setOnloading] = useState(
    banner && aboutInfo ? false : true
  );

  useEffect(() => {
    // LOAD DATA
    if (!onloading) {
      getBanner("about").then((_banners) => {
        storage.banner.set(_banners);
      });

      getAboutInfo().then((_aboutInfo) => {
        storage.aboutInfo.set(_aboutInfo);
      });

      return;
    }

    let _isMounted = true;
    setLoadingPromise(
      [
        getBanner("about").then((_banners) => {
          if (_isMounted) setBanner(_banners);
          storage.banner.set(_banners);
        }),
        getAboutInfo().then((_aboutInfo) => {
          if (_isMounted) setAboutInfo(_aboutInfo);
          storage.aboutInfo.set(_aboutInfo);
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
    <div className="PageAbout">
      <Loading loading={onloading} />
      <div className="container-fluid">
        <div className="row">
          <div className="w-100">
            {banner ? <Banner datas={banner} objectFit="cover" /> : null}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="_box">
              {aboutInfo ? (
                <>
                  <div className="box_title">{aboutInfo.title}</div>
                  <div className="box_content">
                    <ListItem datas={aboutInfo.contents} />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAbout;
