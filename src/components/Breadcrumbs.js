import { Breadcrumb } from "antd";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = [
    {
      title: <NavLink to="/">Home</NavLink>,
      key: "home",
    },
    ...pathSnippets.map((snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      return {
        title: <NavLink to={url}>{snippet}</NavLink>,
        key: url,
      };
    }),
  ];

  return (
    <>
      <Breadcrumb style={{ margin: "16px 16px" }} items={breadcrumbItems} />
    </>
  );
};

export default Breadcrumbs;
