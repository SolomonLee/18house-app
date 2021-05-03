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
    <div className="PageProduct">
      <Loading loading={albumRef === null || !albumRef} />
      <div className="container">
        {albumRef === null || !albumRef ? null : (
          <div className="album_box">
            <div className="box_title">
              <img src={albumRef.imgUrl} alt={albumRef.imgAlt} />
            </div>
            <div className="box_content">
              <div className="row">
                <div className="col-md-5 col-4 text-right">
                  <p>作品名稱:</p>
                </div>
                <div className="col-md-6 col-8 text-left">
                  <p>{albumRef.title}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-5 col-4 text-right">
                  <p>作品細項:</p>
                </div>
                <div className="col-md-6 col-8 text-left">
                  <p>{albumRef.subTitle}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 col-4 text-right">
                  <p>作品類別:</p>
                </div>
                <div className="col-md-6 col-8 text-left">
                  <p>{albumRef.type}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 col-4 text-right">
                  <p>創作日期:</p>
                </div>
                <div className="col-md-6 col-8 text-left">
                  <p>{albumRef.createDate}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 col-4 text-right">
                  <p>創作概念:</p>
                </div>
                <div className="col-md-6 col-8 text-left">
                  <p>{albumRef.createIdea}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 col-4 text-right">
                  <p>作者姓名:</p>
                </div>
                <div className="col-md-6 col-8 text-left">
                  <p>{albumRef.creator}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 col-4 text-right"></div>
                <div className="col-md-6 col-8 text-left">
                  <p>{albumRef.content}</p>
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
