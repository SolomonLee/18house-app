import { useState } from "react";
import { useInterval } from "../common/timer";
import classNames from "classnames";

const Broadcast = (props) => {
  const [indexBroadcastData, setIndexBroadcastData] = useState(0);
  const [indexBroadcastPrveData, setIndexBroadcastPrveData] = useState(0);
  const [objClassName, setobjClassName] = useState({
    broadcast_item: true,
    active: false,
  });

  const intervalTime = props?.intervalTime ? props.intervalTime : 3000;

  useInterval(() => {
    setobjClassName({
      broadcast_item: true,
      active: true,
    });

    setTimeout(() => {
      setobjClassName({
        broadcast_item: true,
        active: false,
      });
    }, intervalTime / 2);

    setIndexBroadcastPrveData(indexBroadcastData);
    if (indexBroadcastData >= props.content.length - 1) {
      setIndexBroadcastData(0);
    } else {
      setIndexBroadcastData(indexBroadcastData + 1);
    }
  }, intervalTime);

  return (
    <div className={classNames(objClassName)}>
      <div className="item_content">
        <span className="now">{props.content[indexBroadcastData]}</span>
        <span className="prve">{props.content[indexBroadcastPrveData]}</span>
      </div>
    </div>
  );
};

export default Broadcast;
