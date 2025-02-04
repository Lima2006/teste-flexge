import { FileOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { useLogin } from "../hooks/use-login";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const { logout } = useLogin();

  return (
    <Layout.Header className="flex justify-between items-center gap-x-4">
      {!!title && <div className="text-white text-xl font-bold">{title}</div>}
      <Menu
        className="min-w-0, flex-auto justify-end"
        theme="dark"
        mode="horizontal"
        selectable={false}
        items={[
          {
            type: "item",
            key: "contracts",
            icon: <FileOutlined />,
            onClick: () => navigate("/contracts"),
            label: "Contracts",
          },
        ]}
      ></Menu>

      <Button type="primary" danger icon={<LogoutOutlined />} onClick={logout}>
        Logout
      </Button>
    </Layout.Header>
  );
};

export default Header;
