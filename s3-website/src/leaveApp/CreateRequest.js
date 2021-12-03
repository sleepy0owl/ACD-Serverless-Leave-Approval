import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import Axios from "axios";
import { GlobalContext } from "./Context";
import configData from "./config.json";
import { Input, Button, DatePicker, Card } from "antd";

const CreateRequest = () => {
  const { token, get_user_info } = useContext(GlobalContext);
  const [value, setValue] = useState("");
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });
  const [noDays, setNoDays] = useState(0);
  const { startDate, endDate } = dates;

  useEffect(() => {
    if (startDate && endDate) {
      const noDays = moment(endDate).diff(moment(startDate), "days") + 1;
      noDays > 0 ? setNoDays(noDays) : setNoDays(0);
    }
  }, [startDate, endDate]);

  var item = JSON.parse(localStorage.getItem("users"));
  var decoded_mail = item && item.email;
  const submitData = () => {
    if (noDays > 0 && value && token) {
      const data = {
        type: "requestLeave",
        email: decoded_mail,
        from: startDate,
        to: endDate,
        numberOfDays: noDays,
        leavesTaken: 11,
        reason: value,
      };
      const url = `https://${configData.APIDomain}.execute-api.${configData.Region}.amazonaws.com/prod/requestLeave`;
      Axios({
        method: "POST",
        url,
        data,
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((el) => {
          setDates({ startDate: "", endDate: "" });
          setValue("");
          setNoDays(0);
          setTimeout(() => {
            get_user_info(decoded_mail, token);
          }, 1000);
        })
        .catch((err) => {
          // console.log(err);
        });
    }
  };

  const datePicker = (moment, dates) => {
    setDates({
      startDate: dates[0],
      endDate: dates[1],
    });
  };

  return (
    <>
      <Card title={<span> Create New Request</span>} bordered={false}>
        <div style={{ display: "flex" }}>
          <Input.Group>
            <DatePicker.RangePicker
              style={{ width: "60%" }}
              onChange={datePicker}
            />
            <Input
              style={{ width: "40%" }}
              placeholder="Reason For Leave"
              onChange={(e) => setValue(e.target.value)}
            />
          </Input.Group>
          <Button type="primary" onClick={() => submitData()}>
            Request {noDays} {noDays < 2 ? "day" : "days"} of leave
          </Button>
        </div>
      </Card>
    </>
  );
};

export default CreateRequest;
