import React from "react";

import Sidebar from "../Component/WorkSpace/Sidebar/SideBarTeacher";
import RouteWorkspace from "./_routesWorkspace";
import { Layout, Avatar } from "antd";
import NavBar from "../Component/WorkSpace/navBar/NavBarTeacher";
import BreadCrumb from "../Component/Breadcrumb/Breadcrumb";

const { Content, Footer } = Layout;

const WorkspaceTeacher = () => {
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sidebar />
        <Layout className="site-layout">
          <NavBar />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <BreadCrumb />

            <RouteWorkspace />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            CTE-Learning Design ©2021 Created by C2SE.01
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default WorkspaceTeacher;
