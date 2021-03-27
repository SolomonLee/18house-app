import { useState, useEffect } from "react";

import ListItem from "../ListItem";
import RadioItem from "../RadioItem";

import { getAlbums, getAlbumTypes } from "../../apis/apiAlbums";

const PageAlbum = (props) => {
  const [banner, setBanner] = useState([]);
  const [aboutInfo, setAboutInfo] = useState({});

  useEffect(() => {
    getAlbumTypes().then(
      (_albumTypes) => {
        setAboutInfo(_albumTypes);
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );
  }, []);

  return (
    <div className="content PageAlbum">
      <div className="container-fluid">
        <div className="row">
          <div className="w-100">
            {/* <Banner datas={banner} objectFit="cover" /> */}
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

export default PageAlbum;
