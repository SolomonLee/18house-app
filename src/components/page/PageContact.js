import { useState, useEffect } from "react";

import { getContactDatas } from "../../apis/apiContent";
import { getContactDatas_ListItem } from "../../adapters/atContent";

import ListItem from "../ListItem";
import FormContact from "../combo/FormContact";

const PageContact = (props) => {
  const [contactDatas, setContactDatas] = useState([]);

  useEffect(() => {
    getContactDatas().then(
      (_contactDatas) => {
        setContactDatas(getContactDatas_ListItem(_contactDatas));
      },
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      }
    );
  }, []);

  let i = 0;
  const jsxContactData = contactDatas.map((contactData) => {
    return (
      <div className="col-md-4" key={"PageContact_" + i++}>
        <ListItem title={contactData.title} datas={contactData.datas} />{" "}
      </div>
    );
  });

  return (
    <div className="content PageContact">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="message_box">
              <div className="box_title">Contact Us</div>
              <div className="box_content">
                <div className="row">{jsxContactData}</div>
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
    </div>
  );
};

export default PageContact;
