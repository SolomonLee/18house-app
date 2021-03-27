import { Link } from "react-router-dom";
import classNames from "classnames";
import { useState, useEffect, useRef } from "react";

const bannerDuration = 1000;
let autoMoveBannerDuration = 5000;
let prveMove = Date.now();
let bannerIntervalTimer = null;

// const setBannerIntervalTimer = () => {
//   clearInterval(bannerIntervalTimer);

//   bannerIntervalTimer = setInterval(() => {
//     if (Date.now() - prveMove < autoMoveBannerDuration) return;
//     const btn = document.querySelector(".banner_box .btn_right");
//     if (btn) btn.click();
//   }, 3000);
// };

// props : 1. datas  , 2. objectFit: cover or contain(default)
const Banner = (props) => {
  if (!props.datas?.length) return null;

  const [objDatasClassNames, setObjDatasClassNames] = useState({ datas: true });
  const [bannerDatas, setBannerDatas] = useState([]);
  const [moveBannerLeft, setMoveBannerLeft] = useState({ run: () => {} });
  const [moveBannerRight, setMoveBannerRight] = useState({ run: () => {} });
  const timerRef = useRef();

  let _moveBannerLock = false;
  const _moveBanner = (_banners, nowBanner, prveBanner, index) => {
    if (_moveBannerLock) return [nowBanner, prveBanner, false];
    _moveBannerLock = true;

    setTimeout(() => {
      _moveBannerLock = false;
    }, bannerDuration);

    if (!index && index !== 0) return;

    for (let i = 0; i < _banners.length; i++) {
      if (_banners[i].classNames.now) {
        if (i == index) break;

        if (prveBanner) {
          prveBanner.classNames.prve = false;
          prveBanner.classNames.active = false;
        }
        prveBanner = nowBanner;
        nowBanner = _banners[index];

        if (i > index)
          setObjDatasClassNames({
            datas: true,
            goRight: false,
            goLeft: true,
          });
        else
          setObjDatasClassNames({
            datas: true,
            goRight: true,
            goLeft: false,
          });

        [
          nowBanner.classNames.now,
          nowBanner.classNames.prve,
          nowBanner.classNames.active,
          prveBanner.classNames.now,
          prveBanner.classNames.prve,
          prveBanner.classNames.active,
        ] = [true, false, true, false, true, true];

        break;
      }
    }
    setBannerDatas(_banners);
    // console.log("==========");
    prveMove = Date.now();
    return [nowBanner, prveBanner, true];
  };

  useEffect(() => {
    let [nowBanner, prveBanner] = [null, null];
    const banners = [];
    props.datas.forEach((data) => {
      banners.push({});

      let _banner = banners[banners.length - 1];
      _banner["index"] = banners.length - 1;
      _banner["url"] = data?.url;
      _banner["imgAlt"] = data?.imgAlt;
      _banner["imgUrl"] = data?.imgUrl;

      _banner["handlerClickPageItem"] = () => {
        [nowBanner, prveBanner] = _moveBanner(
          banners,
          nowBanner,
          prveBanner,
          _banner["index"]
        );
      };

      if (_banner["index"] == 0) {
        _banner["classNames"] = { active: false, now: true, prve: false };
        nowBanner = _banner;
      } else _banner["classNames"] = { active: false, now: false, prve: false };
    });

    setMoveBannerRight({
      run: () => {
        for (let i = banners.length - 1; i >= 0; i--) {
          if (banners[i].classNames.now) {
            if (i == banners.length - 1) {
              [nowBanner, prveBanner] = _moveBanner(
                banners,
                nowBanner,
                prveBanner,
                0
              );
            } else {
              [nowBanner, prveBanner] = _moveBanner(
                banners,
                nowBanner,
                prveBanner,
                i + 1
              );
            }
            break;
          }
        }
      },
    });

    setMoveBannerLeft({
      run: () => {
        // console.log("test moveBannerLeft bannerDatas", banners);
        // console.log("test moveBannerLeft _banners", banners);
        for (let i = 0; i < banners.length; i++) {
          if (banners[i].classNames.now) {
            // console.log("test moveBannerLeft i", i, banners.length - 1);
            if (i == 0) {
              [nowBanner, prveBanner] = _moveBanner(
                banners,
                nowBanner,
                prveBanner,
                banners.length - 1
              );
            } else {
              [nowBanner, prveBanner] = _moveBanner(
                banners,
                nowBanner,
                prveBanner,
                i - 1
              );
            }
            break;
          }
        }
      },
    });

    setBannerDatas(banners);

    //setBannerIntervalTimer();
  }, [props.datas]);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (Date.now() - prveMove < autoMoveBannerDuration) return;
      const btn = document.querySelector(".banner_box .btn_right");
      if (btn) btn.click();
      // moveBannerRight.run();
    }, 2000);
  }, [moveBannerRight]);

  const objBannerBoxClassNames = { banner_box: true };
  if (
    props?.objectFit &&
    (props.objectFit == "cover" || props.objectFit == "contain")
  ) {
    objBannerBoxClassNames[props?.objectFit] = true;
  }

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

  const btnsPage = bannerDatas.map((data) => {
    const objClassNames = {
      btn: true,
      btn_style_none: true,
    };

    if (data.classNames.now) objClassNames["active"] = true;

    return (
      <button
        key={"banner_" + data.index}
        className={classNames(objClassNames)}
        onClick={data.handlerClickPageItem}
      />
    );
  });

  return (
    <div className={classNames(objBannerBoxClassNames)}>
      <div className="box_content">
        <ul className={classNames(objDatasClassNames)}>
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
                onClick={moveBannerLeft.run}
              >
                <span className="oi oi-chevron-left"></span>
              </button>
              <button
                className="btn btn_style_none btn_right"
                onClick={moveBannerRight.run}
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
