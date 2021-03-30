import { useState, useEffect } from "react";
import Loading from "../Loading";
import CollapseItem from "../CollapseItem";
import { getFAQ } from "../../apis/apiContent";

const PageFAQ = (props) => {
  const [contentFAQs, setContentFAQs] = useState([]);
  const [onloading, setOnloading] = useState(true);

  useEffect(() => {
    // LOAD DATA
    let _isMounted = true;
    getFAQ()
      .then(
        (_contentFAQs) => {
          if (_isMounted) {
            setContentFAQs(_contentFAQs);
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

  const _datas = contentFAQs.map((data) => {
    const key = "PageFAQ_" + data.id.toString();

    let contents = [];
    data.contents.forEach((content) => {
      contents.push(<p key={key + content}>{content}</p>);
    });
    return (
      <CollapseItem
        key={key}
        title={data.title}
        datas={contents}
        styleClass="topic"
        defualtCollapse={false}
      />
    );
  });

  return (
    <div className="content PageFAQ">
      <Loading loading={onloading} />
      <div className="container">
        <div className="message_box">
          <div className="box_title">FAQ</div>
          <div className="box_content">{_datas}</div>
        </div>
      </div>
    </div>
  );
};

export default PageFAQ;
