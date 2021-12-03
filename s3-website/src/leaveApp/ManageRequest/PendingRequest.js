import Axios from "axios";
import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import configData from "../config.json";
import { Table, Space, Button } from "antd";

const columns = [
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
  },
  {
    title: "Number Of Days",
    dataIndex: "numberOfDays",
    key: "numberOfDays",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Button>
        <Space size="middle">Approve</Space>
      </Button>
    ),
  },
];

const PendingRequests = () => {
  const { data, loading, get_user_info, token } = useContext(GlobalContext);
  // const [loading, setLoading] = useState(false);

  var item = JSON.parse(localStorage.getItem("users"));
  var get_mail = item && item.email;
  const approveFunction = (val, cognitoToken) => {
    console.log(val, cognitoToken);
    var url = `https://${configData.APIDomain}.execute-api.${configData.Region}.amazonaws.com/prod/manualApproval`;
    Axios({
      method: "POST",
      url,
      data: val,
      headers: {
        Authorization: `${cognitoToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((el) => {
        setTimeout(() => {
          get_user_info(get_mail, cognitoToken);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return <section className="mt-5 text-center">Loading...</section>;
  }
  return (
    <>
      <Table
        pagination={{ position: ["none", "none"] }}
        dataSource={data.pendingRequests}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              approveFunction(record, token);
            },
          };
        }}
      />
    </>
  );
};

export default PendingRequests;
