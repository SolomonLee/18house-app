import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  selectDatas,
  selectDataRef,
  selectById,
  updateAlbumsAsync,
} from "../../reducers/albumsRedux";
import Loading from "../Loading";

const PageProduct = ({ match }) => {
  const pid = match.params.pid;

  const albumRef = useSelector(selectDataRef);
  const albums = useSelector(selectDatas);
  const dispatch = useDispatch();

  useEffect(() => {
    // LOAD DATA
    dispatch(updateAlbumsAsync());
  }, []);

  useEffect(() => {
    console.log("albumsRefs UPDATE!!!", albums);
    dispatch(selectById(parseInt(pid)));
  }, [albums]);

  useEffect(() => {
    // LOAD DATA
    console.log("albumRef : ", albumRef);
  }, [albumRef]);

  return (
    <div className="content PageProduct">
      <Loading loading={albumRef === null || !albumRef} />
      <div className="container">
        {albumRef === null || !albumRef ? null : (
          <div className="album_box">
            <div className="box_title">
              <img src={albumRef.imgUrl} alt={albumRef.imgAlt} />
            </div>
            <div className="box_content">
              <div className="row">
                <div className="col-5 text-right">
                  <p>作品名稱:</p>
                  <p>作品細項:</p>
                  <p>作品類別:</p>
                  <p>創作日期:</p>
                  <p>創作概念:</p>
                  <p>作家:</p>
                </div>
                <div className="col-6 text-left">
                  <p>{albumRef.title}</p>
                  <p>{albumRef.subTitle}</p>
                  <p>{albumRef.type}</p>
                  <p>{albumRef.createDate}</p>
                  <p>{albumRef.createIdea}</p>
                  <p>{albumRef.creator}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageProduct;
