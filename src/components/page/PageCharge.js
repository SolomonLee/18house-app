import { useState, useEffect } from "react";
import Loading from "../Loading";
import InfoItem from "../InfoItem";
import { getChargeDatas } from "../../apis/apiContent";

import { storage, initSession } from "../../common/sessionStorageExtend";

initSession({
    chargeDatas: "PageChargeFiexDataChargeDatas",
});

const PageCharge = (props) => {
    const [chargeDatas, setChargeDatas] = useState(storage.chargeDatas.get());
    const [onloading, setOnloading] = useState(chargeDatas ? false : true);

    useEffect(() => {
        // LOAD DATA
        if (!onloading) {
            getChargeDatas().then((_chargeDatas) => {
                storage.chargeDatas.set(_chargeDatas);
            });
            return;
        }

        let _isMounted = true;
        getChargeDatas()
            .then(
                (_chargeDatas) => {
                    if (_isMounted) {
                        storage.chargeDatas.set(_chargeDatas);
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

    return (
        <div className="PageCharge">
            <Loading loading={onloading} />
            <div className="container">
                <div className="_box">
                    <div className="box_title">收費方式</div>
                    <div className="box_content">
                        {chargeDatas
                            ? chargeDatas.map((data) => {
                                  const key = `PageCharge_${data.contents}`;
                                  return (
                                      <div key={key} className="row">
                                          <div className="col">
                                              <InfoItem
                                                  title={data.title}
                                                  content={data.contents}
                                              />
                                          </div>
                                      </div>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageCharge;
