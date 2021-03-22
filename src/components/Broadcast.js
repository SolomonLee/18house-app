import { useState } from "react";
import { useInterval } from "../common/timer";

const Broadcast = (props) => {
  const [indexBroadcastData, setIndexBroadcastData] = useState(0);
  const intervalTime = props?.intervalTime ? props.intervalTime : 3000;

  useInterval(() => {
    if (indexBroadcastData >= props.content.length - 1) {
      setIndexBroadcastData(0);
    } else {
      setIndexBroadcastData(indexBroadcastData + 1);
    }
  }, intervalTime);

  return (
    <div className="broadcast_box">
      <div className="box_content">
        <span>{props.content[indexBroadcastData]}</span>
      </div>
    </div>
  );
};

export default Broadcast;
