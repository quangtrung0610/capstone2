import { Input, Space, Table } from "antd";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const InsertScores = () => {
  const [studentList, setstudentList] = useState([]);
  const location = useLocation();
  const { pathname } = location;

  const [scores_15p1, setScores_15p1] = useState("");
  const [scores_15p2, setScores_15p2] = useState("");
  const [scores_15p3, setScores_15p3] = useState("");
  const [scores_45p1, setScores_45p1] = useState("");
  const [scores_semester, setScores_semester] = useState("");

  const class_id = pathname.split("/")[3];
  console.log(class_id);
  useEffect(() => {
    Axios.post(
      "http://localhost:1337/selectclasses/class",
      { class_id: class_id },
      {
        withCredentials: true,
      }
    ).then((res) => {
      setstudentList(res.data.result);
    });
  }, []);

  useEffect(() => {
    const data = {
      scores_15p1: scores_15p1,
      scores_15p2: scores_15p2,
      scores_15p3: scores_15p3,
      scores_45p1: scores_45p1,
      scores_semester: scores_semester,
    };
    Axios.post(
      "http://localhost:1337/selectclasses/class/update",
      { class_id: class_id },
      {
        withCredentials: true,
      }
    ).then((res) => {});
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "num",
    },
    {
      title: "Student Name",
      dataIndex: "full_name",
    },
    {
      title: "15 minutes test",
      dataIndex: "scores_15p1",
      render: (value) => (
        <Input
          value={value}
          onChange={(e) => {
            setScores_15p1(e.target.value);
          }}
          style={{ width: "60px" }}
        />
      ),
    },
    {
      title: "15 minutes test",
      dataIndex: "scores_15p2",
      render: (value) => (
        <Input
          value={value}
          onChange={(e) => {
            setScores_15p2(e.target.value);
          }}
          style={{ width: "60px" }}
        />
      ),
    },
    {
      title: "15 minutes test",
      dataIndex: "scores_15p3",
      render: (value) => (
        <Input
          value={value}
          onChange={(e) => {
            setScores_15p3(e.target.value);
          }}
          style={{ width: "60px" }}
        />
      ),
    },
    {
      title: "45 minutes test",
      dataIndex: "scores_45p1",
      render: (value) => (
        <Input
          value={value}
          onChange={(e) => {
            setScores_45p1(e.target.value);
          }}
          style={{ width: "60px" }}
        />
      ),
    },
    {
      title: "Semester",
      dataIndex: "scores_semester",
      render: (value) => (
        <Input
          value={value}
          onChange={(e) => {
            setScores_semester(e.target.value);
          }}
          style={{ width: "60px" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => <Button className="btn--main">update</Button>,
    },
  ];
  return <Table columns={columns} dataSource={studentList} />;
};

export default InsertScores;
