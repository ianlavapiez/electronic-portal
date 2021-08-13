import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Dropdown from "antd/es/dropdown";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import Title from "antd/es/typography/Title";
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  HeaderContainer,
  LayoutContainer,
  UserButtonContainer,
} from "./Admin.styles";

const { Sider } = Layout;

const AdminPage = ({ history }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [setSelectedKey] = useState("dashboard");

  const menu = (
    <Menu>
      <Menu.Item onClick={() => history.push("/admin-login")}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  const onCollapse = (collapsed) => setCollapsed(collapsed);

  return (
    <LayoutContainer>
      <HeaderContainer className="header">
        <Title
          style={{
            color: "white",
          }}
          level={3}
        >
          E-Portal
        </Title>
        <Dropdown overlay={menu}>
          <UserButtonContainer
            style={{
              backgroundColor: "#001628",
              color: "white",
              width: 150,
            }}
            icon={<SettingOutlined />}
          >
            Admin
          </UserButtonContainer>
        </Dropdown>
      </HeaderContainer>
      <Layout>
        <Sider
          className="site-layout-background"
          collapsed={collapsed}
          collapsible
          onCollapse={onCollapse}
          width={300}
        >
          <Menu
            defaultSelectedKeys={["dashboard"]}
            defaultOpenKeys={["dashboard"]}
            mode="inline"
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              key="dashboard"
              icon={<DashboardOutlined />}
              onClick={() => setSelectedKey("dashboard")}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="storeOwners"
              icon={<UserOutlined />}
              onClick={() => setSelectedKey("storeOwners")}
            >
              Store Owners
            </Menu.Item>
            <Menu.Item
              key="users"
              icon={<UserOutlined />}
              onClick={() => setSelectedKey("users")}
            >
              Users
            </Menu.Item>
          </Menu>
        </Sider>
      </Layout>
    </LayoutContainer>
  );
};

export default withRouter(AdminPage);
