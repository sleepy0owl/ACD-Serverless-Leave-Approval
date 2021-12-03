import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import "./Components.css";
import { Card, Row } from "antd";
import { NavLink } from "react-router-dom";

const Cards = (props) => {
  const { data } = useContext(GlobalContext);

  const card = (text, num, link) => {
    return (
      <>
        <Card
          style={{ width: "20vw", margin: "2vh" }}
          title={
            <>
              <NavLink to={link}> {text} Requests</NavLink>
            </>
          }
          bordered={false}
        >
          {num}
        </Card>
      </>
    );
  };

  return (
    <Row>
      {card("Approved", data.log && data.log.length, "/all-request")}
      {card(
        "Pending",
        data.pendingRequests && data.pendingRequests.length,
        "/pending-request"
      )}
    </Row>
  );
};

export default Cards;
