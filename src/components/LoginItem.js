import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectType,
  selectName,
  selectBirthday,
  logout,
} from "../reducers/userRedux";
import { useEffect } from "react";
import LinkList from "./LinkList";

export const LoginItem = (props) => {
  const userType = useSelector(selectType);
  const userName = useSelector(selectName);
  const userBirthday = useSelector(selectBirthday);
  const dispatch = useDispatch();

  const handlerLogout = (e) => {
    dispatch(logout());
  };

  useEffect(() => {
    console.log("userType : ", userType);
  }, [userType]);
  return (
    <LinkList styleClass="footerSubMenu">
      {userType === "遊客" ? (
        <li>
          <Link to="/Login">Login</Link>
        </li>
      ) : (
        <>
          <li>
            <Link to="/Backend">後台</Link>
          </li>
          <li>
            <Link to="/" onClick={handlerLogout}>
              登出:{userName}
            </Link>
          </li>
        </>
      )}
    </LinkList>
  );
};

export const setLoadingPromise = (arr, err, _finally) => {
  return Promise.all(arr)
    .catch(() => {
      err();
    })
    .finally(() => {
      _finally();
    });
};

export default LoginItem;
