import React, { useContext } from "react";

import { useLocation } from "react-router-dom";
import { GlobalContext } from "./Context";
import { PageHeader, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import configData from "./config.json";
const cognitoUrl =
  `https://${configData.CognitoUserPoolDomain}.auth.${configData.Region}.amazoncognito.com/login?client_id=${configData.CognitoClientId}&response_type=token&redirect_uri=https://${configData.CloudfrontUrl}`.toString();

const Navbar = () => {
  const { removeTokens } = useContext(GlobalContext);
  const loc = useLocation();
  console.log(loc.pathname);

  const navBarUserInfo = (path, decoded_username) => {
    if (path !== "/")
      return (
        <>
          <Button
            style={{
              border: "none",
              padding: 0,
            }}
            onClick={removeTokens}
          >
            <UserOutlined
              style={{
                fontSize: 20,
                verticalAlign: "top",
              }}
            />
            sign out
          </Button>
          {decoded_username}
        </>
      );
    else
      return (
        <>
          <Button
            style={{
              border: "none",
              padding: 0,
            }}
            href={cognitoUrl}
          >
            <UserOutlined
              style={{
                fontSize: 20,
                verticalAlign: "top",
                paddingRight: "5px",
              }}
            />
            sign in
          </Button>
        </>
      );
  };

  var item = JSON.parse(localStorage.getItem("users"));
  var decoded_username = item && item["cognito:username"];

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Serverless Leave Approval Application"
        extra={[navBarUserInfo(loc.pathname, decoded_username)]}
      />
    </>
  );
};

export default Navbar;
