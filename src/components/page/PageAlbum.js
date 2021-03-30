import { useState, useEffect } from "react";

import FliterBox from "../combo/FliterBox";
import ShowcaseList from "../combo/ShowcaseList";
import Loading, { setLoadingPromise } from "../Loading";

import { getAlbums, getAlbumTypes } from "../../apis/apiAlbums";
import { getAlbumTypes_FliterBox } from "../../adapters/atContent";

const refFliterDefaultSelect = {};
const PageAlbum = (props) => {
  const [albumFliters, setAlbumFliters] = useState([]);
  const [albumDatas, setAlbumDatas] = useState([]);
  const [onloading, setOnloading] = useState(true);
  const [onSearching, setOnSearching] = useState(false);

  useEffect(() => {
    // LOAD DATA
    let _isMounted = true;
    setLoadingPromise(
      [
        getAlbumTypes().then((_albumTypes) => {
          if (_isMounted) {
            setAlbumFliters(
              getAlbumTypes_FliterBox(_albumTypes, refFliterDefaultSelect)
            );
          }
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

  useEffect(() => {
    let _isMounted = true;
    albumFliters.forEach((v) => {
      refFliterDefaultSelect[v.gid] = v.select;
    });

    setOnSearching(true);
    getAlbums(refFliterDefaultSelect).then((datas) => {
      if (_isMounted) {
        setOnSearching(false);
        setAlbumDatas(datas);
      }
    });
    return () => (_isMounted = false);
  }, [albumFliters]);

  const _setValue = (v) => {
    setAlbumFliters(v);
  };

  return (
    <div className="content PageAlbum">
      <Loading loading={onloading} />
      <div className="container-fluid">
        <div className="row">
          <FliterBox
            tkey="pageAlbumFliter"
            datas={albumFliters}
            setValue={_setValue}
          />
          <ShowcaseList
            title="&nbsp;"
            datas={albumDatas}
            onloading={onSearching}
          />
        </div>
      </div>
    </div>
  );
};

export default PageAlbum;
