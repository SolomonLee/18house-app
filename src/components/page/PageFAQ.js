import { useState, useEffect } from "react";
import Loading, { setLoadingPromise } from "../Loading";
import CollapseItem from "../CollapseItem";
import { getFAQ } from "../../apis/apiContent";
import { getQuestion } from "../../apis/apiQuestion";

const PageFAQ = (props) => {
  const [contentFAQs, setContentFAQs] = useState([]);
  const [contentQuestions, setContentQuestions] = useState([]);
  const [onloading, setOnloading] = useState(true);

  useEffect(() => {
    // LOAD DATA
    let _isMounted = true;

    setLoadingPromise(
      [
        getFAQ().then((_contentFAQs) => {
          if (_isMounted) {
            setContentFAQs(_contentFAQs);
          }
        }),
        getQuestion().then((_contentQuestions) => {
          if (_isMounted) setContentQuestions(_contentQuestions);
        }),
      ],
      () => {
        alert("這個網站發生一些錯誤, 請聯絡官方人員。");
      },
      () => {
        _isMounted ? setOnloading(false) : null;
      }
    );

    return () => (_isMounted = false);
  }, []);

  const datas = contentFAQs.map((data, index) => {
    const key = "PageFAQ_" + index.toString();

    let contents = [];
    data.contents.forEach((content) => {
      contents.push(<p key={key + content}>{content}</p>);
    });
    return (
      <CollapseItem
        key={key}
        title={data.title}
        styleClass="topic"
        defualtCollapse={false}
      >
        {contents}
      </CollapseItem>
    );
  });

  const questions = contentQuestions.map((data) => {
    const key = `PageFAQ_Questions_${data.name}_${data.email}`;
    console.log("data", data);

    let contents = (
      <div>
        <p>提問者 : {data.name}</p>
        <p>內文 : {data.content}</p>
        <p>回覆 : {data.ans}</p>
      </div>
    );

    return (
      <CollapseItem
        key={key}
        title={data.title}
        styleClass="topic"
        defualtCollapse={false}
      >
        {contents}
      </CollapseItem>
    );
  });

  return (
    <div className="content PageFAQ">
      <Loading loading={onloading} />
      <div className="container">
        <div className="message_box">
          <div className="box_title">FAQ</div>
          <div className="box_content">{datas}</div>
        </div>
        <div className="message_box">
          <div className="box_title">網友提問</div>
          <div className="box_content">{questions}</div>
        </div>
      </div>
    </div>
  );
};

export default PageFAQ;
