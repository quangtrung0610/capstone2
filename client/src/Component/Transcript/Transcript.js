import { Table } from "antd";
import { useEffect, useState } from "react";
import Axios from "axios";

const Transcript = () => {
  const [transcript, setTranscript] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/transcript/personal", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.result) {
        setTranscript(res.data.result);
      }
    });
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "num",
    },
    {
      title: "Subject",
      dataIndex: "title",
    },
    {
      title: "15 minutes test",
      dataIndex: "scores_15p1",
    },
    {
      title: "15 minutes test",
      dataIndex: "scores_15p2",
    },
    {
      title: "15 minutes test",
      dataIndex: "scores_15p3",
    },
    {
      title: "45 minutes test",
      dataIndex: "scores_45p1",
    },
    {
      title: "Semester",
      dataIndex: "scores_semester",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
  ];
  return <Table columns={columns} dataSource={transcript} />;
};

export default Transcript;
