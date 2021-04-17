import { useEffect, useCallback, useRef } from "react";

import CollapseItem from "../CollapseItem";
import RadioGroup from "./RadioGroup";

import { useSelector, useDispatch } from "react-redux";
import { selectTypes, updateDataTypes } from "../../reducers/albumsRedux";

export const AlbumsFliterBox = (props) => {
  const albumTypes = useSelector(selectTypes);
  const dispatch = useDispatch();

  // const filterRef = useRef([]);
  const filterRef = { current: [] };
  const retrunFilter = useCallback((groupname, optval) => {
    const index = filterRef.current.findIndex((_fr) => _fr.title === groupname);
    // console.log("useCallback ==========");
    // console.log("filterRef.current", filterRef.current);
    // console.log("index", index);
    if (index === -1) {
      filterRef.current.push({ title: groupname, name: optval });
      dispatch(updateDataTypes(filterRef.current));
    } else {
      if (filterRef.current[index].name !== optval) {
        // console.log("before splice filterRef.current", filterRef.current);
        // console.log("before splice index", index);
        // console.log("before splice filterRef.current[0]", filterRef.current[0]);
        filterRef.current.splice(index, 1);
        filterRef.current.push({ title: groupname, name: optval });
        dispatch(updateDataTypes(filterRef.current));
      }
    }
  });

  const keys = props.tkey + "_collapse";

  useEffect(() => {
    filterRef.current = [];
    dispatch(updateDataTypes([]));
  }, [albumTypes]);

  const content = albumTypes.map((data, index) => {
    const radioGroupOpts = [];
    data.contents.forEach((content) => {
      radioGroupOpts.push({ title: content.name, val: content.name });
    });

    const radioGroupDefualt = radioGroupOpts[0].val;

    return (
      <CollapseItem key={keys + index.toString()} title={data.title}>
        <RadioGroup
          tkey={keys + index.toString() + "_"}
          groupname={data.title}
          opts={radioGroupOpts}
          defualt={radioGroupDefualt}
          onchange={retrunFilter}
        />
      </CollapseItem>
    );
  });

  return (
    <div className="filter_box">
      <div className="box_title">篩選</div>
      <div className="box_content">{content}</div>
    </div>
  );
};

export default AlbumsFliterBox;
