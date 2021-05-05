import { useState, useEffect } from "react";
import Loading, { setLoadingPromise } from "../Loading";
import CollapseItem from "../CollapseItem";
import { getFAQ } from "../../apis/apiContent";
import { getQuestion } from "../../apis/apiQuestion";

import { storage, initSession } from "../../common/sessionStorageExtend";

initSession({
    dataFAQs: "PageFAQFiexDataFAQs",
    dataQuestions: "PageContactFiexDataQuestions",
});

const PageFAQ = (props) => {
    const [contentFAQs, setContentFAQs] = useState(storage.dataFAQs.get());
    const [contentQuestions, setContentQuestions] = useState(
        storage.dataQuestions.get()
    );
    const [onloading, setOnloading] = useState(
        contentFAQs && contentQuestions ? false : true
    );

    useEffect(() => {
        // LOAD DATA
        if (!onloading) {
            getFAQ().then((_contentFAQs) => {
                storage.dataFAQs.set(_contentFAQs);
            });

            getQuestion().then((_contentQuestions) => {
                storage.dataQuestions.set(_contentQuestions);
            });

            return;
        }

        let _isMounted = true;

        setLoadingPromise(
            [
                getFAQ().then((_contentFAQs) => {
                    if (_isMounted) {
                        setContentFAQs(_contentFAQs);
                        storage.dataFAQs.set(_contentFAQs);
                    }
                }),
                getQuestion().then((_contentQuestions) => {
                    if (_isMounted) setContentQuestions(_contentQuestions);
                    storage.dataQuestions.set(_contentQuestions);
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

    return (
        <div className="PageFAQ">
            <Loading loading={onloading} />
            <div className="container">
                <div className="_box">
                    <div className="box_title">FAQ</div>
                    <div className="box_content">
                        {contentFAQs
                            ? contentFAQs.map((data, index) => {
                                  const key = `PageFAQ_${index}_${data.title}`;

                                  let contents = [];
                                  data.contents.forEach((content) => {
                                      contents.push(
                                          <p key={key + content}>{content}</p>
                                      );
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
                              })
                            : null}
                    </div>
                </div>
                <div className="_box">
                    <div className="box_title">網友提問</div>
                    <div className="box_content">
                        {contentQuestions
                            ? contentQuestions.map((data) => {
                                  const key = `PageFAQ_Questions_${data.name}_${data.email}`;

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
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageFAQ;
