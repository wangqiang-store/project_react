import React, { useEffect, useRef, useState } from "react";
import { renderRoutes } from "react-router-config";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  HomeOutlined,
} from "@ant-design/icons";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
// submenu keys of first level
function Home(props) {
  const { route, location } = props;
  const [collapsed, setCollapsed] = useState(false);
  let onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  let skipPage = (e, path) => {
    if (location.pathname !== path) {
      props.history.push(path);
      sessionStorage.setItem("active", JSON.stringify([path]));
    }
  };

  let active = useRef(["/history"]);
  active.current = JSON.parse(sessionStorage.getItem("active"));
  useEffect(() => {
    if (!localStorage.getItem("Auth-Token")) {
      props.history.push("/login");
    }
  });
  return (
    <div style={{ width: "100%" }}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={active.current}>
            <Menu.Item
              key="/main"
              icon={<HomeOutlined />}
              onClick={(e) => skipPage(e, "/main")}
            >
              首页
            </Menu.Item>
            <Menu.Item
              key="/history"
              icon={<DesktopOutlined />}
              onClick={(e) => skipPage(e, "/history")}
            >
              历史数据
            </Menu.Item>
            <Menu.Item
              key="/strain"
              icon={<DesktopOutlined />}
              onClick={(e) => skipPage(e, "/strain")}
            >
              应变信息
            </Menu.Item>
            <SubMenu key="sub1" icon={<PieChartOutlined />} title="路由管理">
              <Menu.Item key="/host" onClick={(e) => skipPage(e, "/host")}>
                主机管理
              </Menu.Item>
              <Menu.Item
                key="/channel"
                onClick={(e) => skipPage(e, "/channel")}
              >
                通道管理
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileOutlined />} title="系统管理">
              <Menu.Item key="/user" onClick={(e) => skipPage(e, "/user")}>
                用户管理
              </Menu.Item>
              <Menu.Item key="/role" onClick={(e) => skipPage(e, "/role")}>
                角色管理
              </Menu.Item>
              <Menu.Item key="/log" onClick={(e) => skipPage(e, "/log")}>
                系统日志
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <h4
              style={{
                color: "#fff",
                textAlign: "left",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              网管系统
            </h4>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              {renderRoutes(route.routes)}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default React.memo(Home);
