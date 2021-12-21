import { Card, Col, Row } from "antd";
import Axios from "axios";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import CardGrid from "./CardGrid";

const SelectClass = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/selectclasses", {
      withCredentials: true,
    }).then((res) => {
      if (res.data.result) {
        setClasses(res.data.result);
      }
    });
  }, []);
  console.log(classes);
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  return (
    <Card title="Card Title" style={{ width: "100%" }}>
      {classes.map((e) => {
        return (
          <Card.Grid style={gridStyle}>
            <Link
              to={{
                pathname: `/teacher-workspace/transcript/${e.class_id}`,
                state: { classes: e },
              }}
            >
              Class: {e.class_id}
            </Link>
          </Card.Grid>
        );
      })}
    </Card>
  );
};

export default SelectClass;
