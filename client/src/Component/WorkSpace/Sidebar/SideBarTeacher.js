import { Layout, Menu } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  ScheduleOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  FormOutlined,
  WechatOutlined,
  FieldNumberOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

class SideBarTeacher extends Component {
  state = {
    collapsed: true,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={this.onCollapse}
        // style={{
        //   overflow: "auto",
        //   height: "100vh",
        //   position: "fixed",
        //   left: 0,
        // }}
        className="sider"
        theme="light"
      >
        <Menu defaultSelectedKeys={["1"]} mode="inline">
          <div className="logo" />
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/teacher-workspace">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ScheduleOutlined />}>
            <Link to="/teacher-workspace/schedule">Schedule</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/teacher-workspace/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FormOutlined />}>
            <Link to="/teacher-workspace/testandquizzes">Test and Quizzes</Link>
          </Menu.Item>

          <Menu.Item key="5" icon={<WechatOutlined />}>
            <Link to="/teacher-workspace/chat">Chat</Link>
          </Menu.Item>

          <Menu.Item key="7" icon={<FieldNumberOutlined />}>
            <Link to="/teacher-workspace/transcript">Transcript</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SideBarTeacher;
