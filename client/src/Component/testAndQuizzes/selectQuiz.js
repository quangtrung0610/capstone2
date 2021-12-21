import { Space, Table, Tag } from "antd";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SelectQuiz = () => {
  const [quizList, setQuizList] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:1337/selectQuiz", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.result) {
        setQuizList(res.data.result);
      }
    });
  }, []);

  const columns = [
    {
      title: "No",
      dataIndex: "num",
    },
    {
      title: "Name of Test",
      dataIndex: "nameOftest",
    },
    {
      title: "Subject",
      dataIndex: "title",
    },
    {
      title: "Teacher",
      dataIndex: "teacher",
    },
    {
      title: "Start date",
      dataIndex: "startDate",
    },
    {
      title: "End date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      dataIndex: "test_id",
      render: (value) => (
        <Space size="middle">
          <Link
            to={{
              pathname: `/student-workspace/testandquizzes/${value}`,
              state: { test_id: value },
            }}
          >
            Start
          </Link>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={quizList} />;
};

export default SelectQuiz;
