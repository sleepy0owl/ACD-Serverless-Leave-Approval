import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import moment from "moment";
import { Table } from "antd";

const columns = [
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
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
    title: "Requested On",
    dataIndex: "dateTime",
    key: "dateTime",
  },
  {
    title: "Approval Status",
    dataIndex: "approvalStatus",
    key: "approvalStatus",
  },
];

const AllRequests = () => {
  const { data, loading } = useContext(GlobalContext);

  if (loading) {
    return <section className="mt-5 text-center">Loading...</section>;
  }
  return (
    <>
      <Table
        pagination={{ position: ["none", "none"] }}
        dataSource={data.log}
        columns={columns}
      />
    </>
  );
};

export default AllRequests;
