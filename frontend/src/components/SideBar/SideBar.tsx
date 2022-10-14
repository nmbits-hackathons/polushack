import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "redux/inerface";
import { Divider, Menu, Card, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { userSelector } from "redux/auth";
import { getSidebarMenu } from "../../helpers/getSidebarMenu";

interface MenuInfo {
  key: string;
  keyPath: string[];
  item: React.ReactInstance;
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}

const { Meta } = Card;

const SideBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(userSelector);
  const menuItems = getSidebarMenu({
    userRole: user?.position || "customer",
  });
  
  const [selectedKey, setSelectedKey] = useState(menuItems[0].key);
  const handleSelectMenuItem = ({ key }: MenuInfo) => {
    setSelectedKey(key);
    navigate(key);
  };
  return (
  <>
    <Card>
      <Meta
        avatar={<Avatar icon={<UserOutlined />}/>}
        title={user?.name}
        description={user?.position === "dispatcher" ? "Диспетчер" : "Водитель"}
      />
    </Card>
    <Divider type="vertical" />
    <Menu
      style={{ width: "100%", padding: "10px 10px" }}
      defaultSelectedKeys={[selectedKey]}
      items={menuItems}
      onSelect={handleSelectMenuItem}
    />
  </>);
};

export default SideBar;