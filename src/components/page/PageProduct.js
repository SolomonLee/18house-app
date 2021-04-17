import { useState, useEffect } from "react";
import Loading from "../Loading";

const PageProduct = ({ match }) => {
  const pid = match.params.pid;
  console.log("pid:", pid);
  const [onloading, setOnloading] = useState(true);

  useEffect(() => {
    // LOAD DATA
    setOnloading(false);
  }, []);

  return (
    <div className="content PageProduct">
      <Loading loading={onloading} />
      <div className="container">
        <div className="message_box">
          <div className="box_title">THIS IS PRODUCT PAGE</div>
          <div className="box_content">{pid}</div>
        </div>
      </div>
    </div>
  );
};

export default PageProduct;
