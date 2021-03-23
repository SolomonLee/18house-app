import FillItem from "./FillItem";
// import TextareaItem from "./TextareaItem";
import React, { useState } from "react";

function FormContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    let a = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };
    console.log("form data : ", a);
  };

  return (
    <form className="form_box x" onSubmit={handleSubmit}>
      <div className="box_title">有任何疑問也可以在下方留言給我們~</div>
      <div className="item_content">
        <div className="row">
          <div className="col">
            <FillItem
              placeholder="如何稱呼呢?"
              setValue={setName}
              type="text"
              defaultValue={name}
              request={true}
            />
          </div>
          <div className="col">
            <FillItem
              placeholder="你的 Email"
              setValue={setEmail}
              type="text"
              defaultValue={email}
              request={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FillItem
              placeholder="來點主題吧"
              setValue={setSubject}
              type="text"
              defaultValue={subject}
              request={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/* <TextareaItem
              placeholder="這裡需要一點訊息"
              setValue={setMessage}
            /> */}
          </div>
        </div>
      </div>
      <div className="box_bottom">
        <input type="submit" value="送出" className="btn btn_style3" />
      </div>
    </form>
  );
}

export default FormContact;
