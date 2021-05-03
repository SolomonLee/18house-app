import { useState, useEffect } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";

import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { loginAsync, selectType } from "../../reducers/userRedux";

const PageLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userType = useSelector(selectType);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("userType:", userType);
  }, []);

  const handlerLogin = (e) => {
    e.preventDefault();
    console.log({ email: email, password: password });

    dispatch(
      loginAsync({
        email: email,
        password: password,
      })
    );
  };

  return (
    <div className="PageLogin">
      {userType == "遊客" ? null : <Redirect to="/" />}
      <Container>
        <div className="_box">
          <div className="box_title">登入</div>
          <div className="box_content">
            <Row>
              <div className="col-md-4 col-xs-0"></div>

              <div className="col-md-4 col">
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handlerLogin}
                  >
                    login
                  </Button>
                </Form>
              </div>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PageLogin;
