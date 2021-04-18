import { useEffect, useState, useRef } from "react";
import { getQuestionById, updateQuestionById } from "../apis/apiQuestion";
import FillItem from "./combo/FillItem";

export const QuestionItem = (props) => {
  if (!props?.questionid) return null;
  const [ans, setQuestionAns] = useState("");
  const [content, setQuestionContent] = useState("");
  const [email, setQuestionEmail] = useState("");
  const [name, setQuestionName] = useState("");
  const [title, setQuestionTitle] = useState("");
  const btnSend = useRef(null);

  useEffect(() => {
    let _isMounted = true;

    getQuestionById(props.questionid)
      .then((result) => {
        if (_isMounted) {
          setQuestionAns(result.ans);
          setQuestionContent(result.content);
          setQuestionEmail(result.email);
          setQuestionName(result.name);
          setQuestionTitle(result.title);
          btnSend.current.disabled = true;
        }
      })
      .catch((e) => {
        // console.log("QuestionItem getQuestionById error. ", e);
      });

    return () => {
      _isMounted = false;
    };
  }, [props.questionid]);

  useEffect(() => {
    btnSend.current.disabled = false;
  }, [ans]);

  const handlerEditQuestion = (e) => {
    btnSend.current.disabled = true;
    updateQuestionById(props.questionid, {
      ans: ans,
    }).then(() => {
      props?.callback?.();
      alert("修改完成!");
    });
  };

  return (
    <div className="question_item">
      <div className="item_title">{`${name} : ${title}`}</div>
      <div className="item_content">
        <p>email : {email}</p>
        <p>content : {content}</p>
        <p>回覆 : </p>
        <FillItem
          type="textArea"
          setValue={setQuestionAns}
          defaultValue={ans}
          value={ans}
        />
      </div>
      <div className="item_bottom">
        <button
          className="btn btn_style1"
          onClick={handlerEditQuestion}
          ref={btnSend}
        >
          確認修改
        </button>
      </div>
    </div>
  );
};

export default QuestionItem;
