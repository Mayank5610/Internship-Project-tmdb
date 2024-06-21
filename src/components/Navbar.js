import React from "react";
import { Button, Layout, Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();

  const authToken = localStorage.getItem("auth-token");

  const handleLogin = () => {
    navigate(`/login`);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate(`/login`);
  };

  const menuItems = [
    {
      key: "1",
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to="/movies-card">Movies</NavLink>,
    },
    {
      key: "3",
      label: <NavLink to="/persons-list">Persons</NavLink>,
    },
    {
      key: "4",
      label: authToken ? (
        <Button type="primary" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Button type="primary" onClick={handleLogin}>
          Login
        </Button>
      ),
    },
  ];

  return (
    <>
      <Header
        style={{
          width: "100%",
          backgroundColor: "white",
          top: "0px",
          position: "sticky",
          zIndex: 2,
        }}
      >
        <Menu
          style={{ width: "100%", position: "fixed", top: "0px" }}
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["/"]}
          items={menuItems}
        />
      </Header>
      <Breadcrumbs />
    </>
  );
};

export default Navbar;
