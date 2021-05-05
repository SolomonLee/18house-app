import { useState, useEffect } from "react";

import { getContactDatas } from "../../apis/apiContent";
import { getContactDatas_ListItem } from "../../adapters/atContent";

import ListItem from "../ListItem";
import FormContact from "../combo/FormContact";
import GoogleMapIframe from "../GoogleMapIframe";
import Loading from "../Loading";

import { storage, initSession } from "../../common/sessionStorageExtend";

initSession({
    textInfo: "PageContactFiexDataTextInfo",
    googleMapUrl: "PageContactFiexDataGoogleMapUrl",
});

const PageContact = () => {
    const [contactDatas, setContactDatas] = useState(storage.textInfo.get());
    const [googleMapUrl, setGoogleMapUrl] = useState(
        storage.googleMapUrl.get()
    );
    const [onloading, setOnloading] = useState(
        contactDatas && googleMapUrl ? false : true
    );

    useEffect(() => {
        // LOAD DATA
        if (!onloading) {
            getContactDatas().then((_contactDatas) => {
                storage.textInfo.set(
                    getContactDatas_ListItem(_contactDatas.textInfo)
                );

                storage.googleMapUrl.set(_contactDatas.googleMapUrl);
            });

            return;
        }
        let _isMounted = true;
        getContactDatas()
            .then(
                (_contactDatas) => {
                    storage.textInfo.set(
                        getContactDatas_ListItem(_contactDatas.textInfo)
                    );
                    storage.googleMapUrl.set(_contactDatas.googleMapUrl);
                    if (_isMounted) {
                        setContactDatas(
                            getContactDatas_ListItem(_contactDatas.textInfo)
                        );
                        setGoogleMapUrl(_contactDatas.googleMapUrl);
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
        <div className="PageContact">
            <Loading loading={onloading} />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="_box">
                            <div className="box_title">聯絡我們</div>
                            <div className="box_content">
                                <div className="row">
                                    {contactDatas
                                        ? contactDatas.map((contactData) => {
                                              return (
                                                  <div
                                                      className="col-md-4"
                                                      key={`PageContact_${contactData.datas}`}
                                                  >
                                                      <ListItem
                                                          title={
                                                              contactData.title
                                                          }
                                                          datas={
                                                              contactData.datas
                                                          }
                                                      />
                                                  </div>
                                              );
                                          })
                                        : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <FormContact />
                    </div>
                </div>
            </div>
            {googleMapUrl ? (
                <div className="container-fluid">
                    <div className="row">
                        <div className="w-100">
                            <GoogleMapIframe url={googleMapUrl} />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default PageContact;
