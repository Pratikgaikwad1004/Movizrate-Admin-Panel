import {
  UploadOutlined,
  PlusSquareOutlined,
  LinkOutlined,
  SlidersOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import UploadMovie from "../views/UploadMovie";
import Navbar from "./Navbar";
import { MovieOutlined } from "@mui/icons-material";
import AddActor from "../views/AddActor";
import LinkActors from "../views/LinkActors";
import Ott from "../views/Ott";
import AddCarousel from "../views/AddCarousel";
import AddAdmin from "../views/AddAdmin";

const { Sider, Content } = Layout;
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [itemKey, setItemKey] = useState("1");
  const [refresh, setRefresh] = useState(0);
  console.log(itemKey);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[itemKey]}
          onClick={(e) => setItemKey(e.key)}
          items={[
            {
              key: "1",
              icon: <UploadOutlined />,
              label: "Upload Movie",
            },
            {
              key: "2",
              icon: <PlusSquareOutlined />,
              label: "Add new cast",
            },
            {
              key: "3",
              icon: <LinkOutlined />,
              label: "Link Actors to Movies",
            },
            {
              key: "6",
              icon: <MovieOutlined />,
              label: "OTT Platform",
            },
            {
              key: "7",
              icon: <SlidersOutlined />,
              label: "Edit Carousel",
            },
            {
              key: "8",
              icon: <UserAddOutlined />,
              label: "Add New Admin",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout" style={{ minHeight: "100vh" }}>
        <Navbar setCollapsed={setCollapsed} collapsed={collapsed} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            height: "fit-content",
          }}
        >
          {itemKey === "1" ? (
            <UploadMovie
              key={refresh}
              setKey={setRefresh}
              reloadActor={refresh}
            />
          ) : itemKey === "2" ? (
            <AddActor key={refresh} setKey={setRefresh} reloadActor={refresh} />
          ) : itemKey === "3" ? (
            <LinkActors
              key={refresh}
              setKey={setRefresh}
              reloadComp={refresh}
            />
          ) : itemKey === "4" ? (
            "Add Admin"
          ) : itemKey === "5" ? (
            "Upcoming"
          ) : itemKey === "6" ? (
            <Ott key={refresh} setKey={setRefresh} reloadComp={refresh} />
          ) : itemKey === "7" ? (
            <AddCarousel
              key={refresh}
              setKey={setRefresh}
              reloadComp={refresh}
            />
          ) : itemKey === "8" ? (
            <AddAdmin key={refresh} setKey={setRefresh} reloadComp={refresh} />
          ) : (
            ""
          )}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Sidebar;
