import FillItem from "./FillItem";
import React, { useState } from "react";
import { setQuestion } from "../../apis/apiContent";
import { verificationEmail } from "../../common/verification";

function FormContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);

    if (email == "" || name == "" || title == "" || content == "") {
      alert("欄位不得為空");
      return;
    }

    if (!verificationEmail(email)) {
      alert("EMAIL 格式有誤");
      return;
    }

    setQuestion({
      name: name,
      email: email,
      title: title,
      content: content,
    }).then(() => {
      console.log("test");
      alert("留言成功~");
      location.reload();
    });
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
              setValue={setTitle}
              type="text"
              defaultValue={title}
              request={true}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FillItem
              placeholder="這裡需要一點訊息"
              setValue={setContent}
              type="textArea"
              defaultValue={content}
              request={true}
            />
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
