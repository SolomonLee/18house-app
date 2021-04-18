import { Switch, Link, Redirect } from "react-router-dom";
import { RouteWithSubRoutes } from "../../route";
import LinkListItem from "../LinkList";

import { useSelector } from "react-redux";
import { selectType } from "../../reducers/userRedux";

const PagBackend = ({ routes }) => {
  const userType = useSelector(selectType);

  return (
    <div className="content PagBackend">
      {userType === "遊客" ? <Redirect to="/" /> : null}
      <div className="container-fluid">
        <div className="_box">
          <div className="box_title"> </div>
          <div className="box_content">
            <div className="row">
              <div className="col-3 text-left">
                <LinkListItem title="熊村莊後台" styleclass="vertical-left">
                  <li>
                    <Link to="/Backend/Questions">Questions</Link>
                  </li>
                  <li>
                    <Link to="/Backend">back</Link>
                  </li>
                </LinkListItem>
              </div>
              <div className="col-9">
                <Switch>
                  {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                  ))}
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagBackend;
