import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectCount, ex } from "./tempReducer";

const TempComponent = (props) => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div className="TEST">
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(ex())}>
          +
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      {/* omit additional rendering output here */}
    </div>
  );
};

export default TempComponent;
