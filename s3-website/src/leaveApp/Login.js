/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import jwt from "jsonwebtoken";
import ChromeDinoGame from "react-chrome-dino";
import { Row, Col, Button } from "antd";

import configData from "./config.json";
const cognitoUrl =
  `https://${configData.CognitoUserPoolDomain}.auth.${configData.Region}.amazoncognito.com/login?client_id=${configData.CognitoClientId}&response_type=token&redirect_uri=https://${configData.CloudfrontUrl}`.toString();

const getParams = window.location.hash;
const getUrl = window.location.href;

const Login = () => {
  const history = useHistory();

  const checkLogin = (token) => {
    var check_access_1 = token && token.split("&")[0];
    var get_access_token =
      check_access_1 && check_access_1.replace("#id_token=", "");
    var decode2 = jwt.decode(get_access_token);

    localStorage.setItem("tokens", JSON.stringify(token));
    localStorage.setItem("users", JSON.stringify(decode2));
    history.replace("/", getUrl);
  };

  useEffect(() => {
    if (getParams) {
      checkLogin(getParams);
    }
    setTimeout(() => {}, 200);
  }, []);

  return (
    <>
      {getParams ? (
        "signedin"
      ) : (
        <div style={{ padding: "15vh 0vh" }}>
          <ChromeDinoGame />
          <Row justify="center" align="middle">
            <Col align="center"></Col>
            <Button type="primary" href={cognitoUrl}>
              Once you are done playing, sign in to the app!
            </Button>
          </Row>
        </div>
      )}
    </>
  );
};

export default Login;
