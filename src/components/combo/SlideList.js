import { useState, useEffect, useRef, useCallback } from "react";

import ShowcaseItem from "../ShowcaseItem";

function SlideList(props) {
  if (props?.datas?.length == 0) return null;

  const [datasIndex, setDatasIndex] = useState(0); // 存放目前 index
  const [itemWidth, setItemWidth] = useState(0); // 存放目前 item 寬度, 用於 scroll
  const [contentWidth, setContentWidth] = useState(0); // 存放目前 content 寬度, 用於 scroll
  const refMaxShowIndex = useRef(0); // 存放最多 scroll 到哪個index
  const refDataBox = useRef(null); // 存放 scroll item , 用於call scrollLeft
  const handleItemWidth = useCallback(() => {
    // 用於持續設定 item 寬度
    if (refDataBox.current?.firstChild?.offsetWidth != itemWidth || false) {
      setItemWidth(refDataBox.current?.firstChild?.offsetWidth);
      setContentWidth(refDataBox.current?.offsetWidth);
    }
  }, []);

  const moveSlide = (index) => {
    if (!itemWidth) handleItemWidth();
    if (index >= refMaxShowIndex.current) index = refMaxShowIndex.current;

    refDataBox.current.scrollLeft = index * itemWidth;
    setDatasIndex(index);
  };

  useEffect(() => {
    window.addEventListener("resize", handleItemWidth);

    return () => {
      window.removeEventListener("resize", handleItemWidth);
    };
  }, []);

  useEffect(() => {
    // 計算 refMaxShowIndex
    let maxShowCount = props.datas.length - Math.ceil(contentWidth / itemWidth);

    if (maxShowCount < 0) {
      maxShowCount = 0;
    }
    if (maxShowCount < refMaxShowIndex.current) {
      refMaxShowIndex.current = maxShowCount;
      moveSlide(datasIndex - (refMaxShowIndex.current - maxShowCount));
    } else refMaxShowIndex.current = maxShowCount;

    refDataBox.current.scrollLeft = datasIndex * itemWidth;
  }, [itemWidth, contentWidth]);

  useEffect(() => {
    setDatasIndex(0);
  }, [props.datas]);

  const handlerMoveRight = () => {
    if (datasIndex + 1 < props.datas.length) moveSlide(datasIndex + 1);
  };

  const handlerMoveLeft = () => {
    if (datasIndex - 1 >= 0) moveSlide(datasIndex - 1);
  };

  return (
    <div className="slide_list_box">
      {props?.title ? <div className="box_title">{props.title}</div> : null}
      <div ref={refDataBox} className="box_content">
        {props.datas.map((data, index) => {
          switch (props.type) {
            case "showcase":
              return (
                <ShowcaseItem
                  key={props.tkey + index.toString()}
                  title={data.title}
                  subTitle={data.subTitle}
                  imgUrl={data.imgUrl}
                  imgAlt={data.imgAlt}
                  pid={data.pid}
                />
              );
          }
        })}
      </div>
      <div className="box_bottom">
        <div className="slide_control">
          <div className="control">
            <div className="left_n_right">
              <button
                className="btn btn_style_none btn_left"
                onClick={handlerMoveLeft}
              >
                <span className="oi oi-chevron-left"></span>
              </button>
              <button
                className="btn btn_style_none btn_right"
                onClick={handlerMoveRight}
              >
                <span className="oi oi-chevron-right"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideList;
