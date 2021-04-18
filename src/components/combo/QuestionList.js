import QuestionItem from "../QuestionItem";

export const QuestionList = (props) => {
  if (!props?.datas || !props.datas.length) return null;

  const questions = props.datas.map((question, index) => (
    <QuestionItem
      key={
        props?.tkey
          ? `${props.tkey}_QuestionList_${index}`
          : `QuestionList_${index}`
      }
      data={question}
    />
  ));

  return (
    <div className="question_box">
      {props?.title ? <div className="box_title">{props.title}</div> : null}
      <div className="box_content">{questions}</div>
    </div>
  );
};

export default QuestionList;
