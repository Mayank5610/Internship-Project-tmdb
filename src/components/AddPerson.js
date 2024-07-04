import { Divider } from "antd";
import React from "react";
import PersonForm from "./PersonForm";
import { useNavigate } from "react-router-dom";

const AddPerson = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate(-1);
  };

  return (
    <>
      <Divider>Add New Person</Divider>
      <PersonForm onCompleted={handleComplete} />
    </>
  );
};

export default AddPerson;
