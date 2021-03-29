import { useState, useEffect } from "react";

import FliterBox from "../combo/FliterBox";
import RadioItem from "../RadioItem";
import Loading, { setLoadingPromise } from "../loading";

import { getAlbums, getAlbumTypes } from "../../apis/apiAlbums";
import { getAlbumTypes_FliterBox } from "../../adapters/atContent";

const PageAlbum = (props) => {
  const [albumFliters, setAlbumFliters] = useState({});
  const [onloading, setOnloading] = useState(true);

  useEffect(() => {
    // LOAD DATA
    let _isMounted = true;
    setLoadingPromise(
      [
        getAlbumTypes().then((_albumTypes) => {
          if (_isMounted) {
            setAlbumFliters(getAlbumTypes_FliterBox(_albumTypes));
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

  return (
    <div className="content PageAlbum">
      <Loading loading={onloading} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <FliterBox
              tkey="pageAlbumFliter"
              datas={albumFliters}
              setValue={setAlbumFliters}
            />
          </div>
          <div className="col-9">999</div>
        </div>
      </div>
    </div>
  );
};

export default PageAlbum;
