import { Link } from "react-router-dom";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";

const bannerLockDuration = 1000; // 嘗試切換banner 間隔時間
const autoMoveBannerDuration = 5000; // 自動切換banner 每次間隔時間

// props : 1. datas  , 2. objectFit: cover or contain(default)
const Banner = (props) => {
  if (!props.datas?.length) return null;

  const [bannerAction, setBannerAction] = useState("stop"); // 控制是否有動畫
  const [bannerDatas, setBannerDatas] = useState([]); // banner資料 array
  const [bannerWaitIndex, setBannerWaitIndex] = useState(0); // 等待動畫 準備移除標記的 banner資料 index
  const [bannerIndex, setBannerIndex] = useState(0); // 目前 banner資料 index
  const [bannerDirection, setBannerDirection] = useState("goRight"); // banner 動畫方向
  const bannerLock = useRef(false); // banner 動畫CD時間
  const timerAutoRunBanner = useRef(); // banner 動畫CD時間

  const moveBanner = (index) => {
    if (bannerLock.current) return false;
    bannerLock.current = true;

    setTimeout(() => {
      bannerLock.current = false;
    }, bannerLockDuration);

    if (index == bannerIndex) return;

    bannerDatas[bannerWaitIndex].classNames.prve = false;
    bannerDatas[bannerIndex].classNames.now = false;
    bannerDatas[bannerIndex].classNames.prve = true;
    bannerDatas[index].classNames.prve = false;
    bannerDatas[index].classNames.now = true;

    if (bannerIndex > index) setBannerDirection("goLeft");
    else setBannerDirection("goRight");

    setBannerWaitIndex(bannerIndex);
    setBannerIndex(index);
    setBannerDatas(bannerDatas);
    return true;
  };

  useEffect(() => {
    setBannerAction("stop");
    bannerDatas.splice(0, bannerDatas.length);
    props.datas.forEach((data) => {
      bannerDatas.push({});

      const _index = bannerDatas.length - 1;
      let _banner = bannerDatas[_index];
      _banner["url"] = data?.url;
      _banner["imgAlt"] = data?.imgAlt;
      _banner["imgUrl"] = data?.imgUrl;

      if (_index == 0) _banner["classNames"] = { now: true, prve: false };
      else _banner["classNames"] = { now: false, prve: false };
    });

    setBannerDatas(bannerDatas);
    setBannerIndex(0);

    const _tempTimer = setTimeout(() => {
      setBannerAction("start");
    }, 1000);

    return () => {
      clearTimeout(_tempTimer);
    };
  }, [props.datas]);

  useEffect(() => {
    const _tempTimer = clearTimeout(timerAutoRunBanner.current);
    timerAutoRunBanner.current = setTimeout(() => {
      moveBannerRight();
    }, autoMoveBannerDuration);

    return () => {
      clearTimeout(_tempTimer);
      clearTimeout(timerAutoRunBanner.current);
    };
  }, [bannerIndex]);

  const datas = bannerDatas.map((data) => {
    if (data?.url) {
      return (
        <li
          className={classNames(data.classNames)}
          key={props.tKey + data.imgAlt}
        >
          <Link to={data.url}>
            <img src={data.imgUrl} alt={data.imgAlt} />
          </Link>
        </li>
      );
    } else {
      return (
        <li
          className={classNames(data.classNames)}
          key={props.tKey + data.imgAlt}
        >
          <img src={data.imgUrl} alt={data.imgAlt} />
        </li>
      );
    }
  });

  const btnsPage = bannerDatas.map((data, index) => {
    const handlerClickPageItem = () => {
      moveBanner(index);
    };

    return (
      <button
        key={"banner_" + index}
        className="btn btn_style_none"
        active={data.classNames.now ? "" : null}
        onClick={handlerClickPageItem}
      />
    );
  });

  const moveBannerLeft = () => {
    if (bannerIndex - 1 < 0) moveBanner(bannerDatas.length - 1);
    else moveBanner(bannerIndex - 1);
  };

  const moveBannerRight = () => {
    if (bannerIndex + 1 == bannerDatas.length) moveBanner(0);
    else moveBanner(bannerIndex + 1);
  };

  return (
    <div className="banner_box" objectfit={props?.objectFit}>
      <div className="box_content">
        <ul
          className="datas"
          bannerdirection={bannerDirection}
          banneraction={bannerAction}
        >
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
        {bannerDatas.length > 1 ? (
          <div className="control">
            <div className="left_n_right">
              <button
                className="btn btn_style_none btn_left"
                onClick={moveBannerLeft}
              >
                <span className="oi oi-chevron-left"></span>
              </button>
              <button
                className="btn btn_style_none btn_right"
                onClick={moveBannerRight}
              >
                <span className="oi oi-chevron-right"></span>
              </button>
            </div>
            <div className="pagertion">{btnsPage ? btnsPage : null}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Banner;
