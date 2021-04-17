import { useState, useEffect } from "react";
import Loading from "../Loading";
import InfoItem from "../InfoItem";
import { getChargeDatas } from "../../apis/apiContent";

const PageCharge = (props) => {
  const [chargeDatas, setChargeDatas] = useState([]);
  const [onloading, setOnloading] = useState(true);

  useEffect(() => {
    // LOAD DATA
    let _isMounted = true;
    getChargeDatas()
      .then(
        (_chargeDatas) => {
          if (_isMounted) {
            setChargeDatas(_chargeDatas);
          }
        },
        () => {
          alert("這個網站發生一些錯誤, 請聯絡官方人員。");
        }
      )
      .finally(() => {
        if (_isMounted) setOnloading(false);
      });

    return () => (_isMounted = false);
  }, []);

  let i = 0;
  const _datas = chargeDatas.map((data) => {
    const key = "PageCharge_" + (++i).toString();
    return (
      <div key={key} className="row">
        <div className="col">
          <InfoItem title={data.title} content={data.contents} />
        </div>
      </div>
    );
  });

  return (
    <div className="content PageCharge">
      <Loading loading={onloading} />
      <div className="container">
        <div className="message_box">
          <div className="box_title">收費方式</div>
          <div className="box_content">{_datas}</div>
        </div>
      </div>
    </div>
  );
};

export default PageCharge;
