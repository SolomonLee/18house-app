import { useEffect } from "react";

import AlbumsFliterBox from "../combo/AlbumsFliterBox";
import ShowcaseList from "../combo/ShowcaseList";
import Loading from "../Loading";

import { useSelector, useDispatch } from "react-redux";
import {
  selectDatasRefs,
  selectStatus,
  updateAlbumsAsync,
} from "../../reducers/albumsRedux";

// const refFliterDefaultSelect = {};
const PageAlbum = (props) => {
  const albumRefs = useSelector(selectDatasRefs);
  const onloading = useSelector(selectStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateAlbumsAsync());
  }, []);

  return (
    <div className="PageAlbum">
      <Loading loading={onloading !== "done"} />
      <div className="container-fluid">
        <div className="row">
          <AlbumsFliterBox tkey="AlbumFliter" />
          <ShowcaseList title="&nbsp;" datas={albumRefs} />
        </div>
      </div>
    </div>
  );
};

export default PageAlbum;
