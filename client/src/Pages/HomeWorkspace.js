import React from "react";
import { Calendar, Col, Row } from "antd";

const HomeWorkspacePage = () => {
  const DemoBox = (props) => (
    <p className={`height-${props.value}`}>{props.children}</p>
  );
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24, minHeight: "100%", borderRadius: "30px" }}
    >
      <h1>Home Workspace</h1>

      <div className="calendar--home">
        <DemoBox value={100}>
          <Calendar fullscreen={false} />
        </DemoBox>
      </div>
    </div>
  );
};

export default HomeWorkspacePage;
