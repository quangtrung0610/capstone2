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

class Sidebar extends Component {
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
      >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <div className="logo" />
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/student-workspace">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ScheduleOutlined />}>
            <Link to="/student-workspace/schedule">Schedule</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link to="/student-workspace/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FormOutlined />}>
            <Link to="/student-workspace/testandquizzes">Test and Quizzes</Link>
          </Menu.Item>
          <SubMenu
            className="subMenu"
            key="sub1"
            icon={<TeamOutlined />}
            title="Teamwork"
          >
            <Menu.Item key="5" icon={<WechatOutlined />}>
              <Link to="/student-workspace/chat">Chat</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<EditOutlined />}>
              <Link to="/student-workspace/teamwork/working">Working</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            className="subMenu"
            key="sub2"
            icon={<FieldNumberOutlined />}
            title="Ranking"
          >
            <Menu.Item key="7">
              <Link to="/student-workspace/transcript/personal">Personal</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/student-workspace/transcript/class">Class</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
