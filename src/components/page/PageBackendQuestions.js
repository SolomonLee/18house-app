import { useCallback, useEffect, useState } from "react";
import { getQuestionId } from "../../apis/apiQuestion";
import QuestionItem from "../QuestionItem";
import ListItem from "../ListItem";

export const PageBackendQuestions = () => {
  const [questionIdAll, setQuestionIdAll] = useState([]);
  const [questionId, setQuestionId] = useState("");

  const researchQuestionId = useCallback((_isMounted = null) => {
    getQuestionId()
      .then((result) => {
        if (_isMounted != null) {
          _isMounted.state ? setQuestionIdAll(result) : null;
        } else {
          setQuestionIdAll(result);
        }
      })
      .catch((e) => {
        // console.log("PageBackendQuestions setQuestionIdAll error. ", e);
      });
  });

  useEffect(() => {
    let _isMounted = { state: true };

    researchQuestionId(_isMounted);

    return () => {
      _isMounted.state = false;
    };
  }, []);

  //   useEffect(() => {
  // console.log("questionId", questionId);
  //   }, [questionId]);

  const opts = questionIdAll.map((_questionId, index) => {
    const handlerChangeQuestionId = () => {
      setQuestionId(_questionId.id);
    };

    return (
      <li key={`PageBackendQuestions_opt_${index}`}>
        <button
          className="btn btn_style_none"
          onClick={handlerChangeQuestionId}
          active={_questionId.isAns ? null : ""}
          select={_questionId.id !== questionId ? null : ""}
        >
          {_questionId.title}
        </button>
      </li>
    );
  });

  return (
    <div className="row">
      <div className="col-3 text-left">
        <ListItem title="問題列表" styleclass="vertical-left-select">
          {opts}
        </ListItem>
      </div>
      <div className="col-9">
        <QuestionItem questionid={questionId} callback={researchQuestionId} />
      </div>
    </div>
  );
};

export default PageBackendQuestions;
