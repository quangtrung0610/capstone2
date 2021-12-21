import { Table } from "antd";
import { useEffect, useState } from "react";
import Axios from "axios";

const TranscriptClass = () => {
  const [transcriptClass, setTranscriptClass] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/transcript/class", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.result) {
        setTranscriptClass(res.data.result);
      }
    });
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "num",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
    },
  ];
  return <Table columns={columns} dataSource={transcriptClass} />;
};

export default TranscriptClass;
