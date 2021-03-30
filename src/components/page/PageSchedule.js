import { useState, useEffect } from "react";
import Loading from "../Loading";
import InfoItem from "../InfoItem";
import { getScheduleDatas } from "../../apis/apiSchedule";

const PageSchedule = (props) => {
  const [scheduleDatas, setScheduleDatas] = useState({});
  const [onloading, setOnloading] = useState(true);

  // LOAD DATA
  let _isMounted = true;
  useEffect(() => {
    getScheduleDatas()
      .then(
        (_scheduleDatas) => {
          if (_isMounted) {
            setScheduleDatas(_scheduleDatas);
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

  return (
    <div className="content PageSchedule">
      <Loading loading={onloading} />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="message_box">
              <div className="box_title">課程表</div>
              <div className="box_content">
                {scheduleDatas?.[0]?.img ? (
                  <img src={scheduleDatas?.[0]?.img} alt="" />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSchedule;
