import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PERSON } from "../graphql/Queries";
import { useParams } from "react-router-dom";
import { Divider, notification, Spin } from "antd";
import PersonForm from "./PersonForm";

const UpdatePerson = () => {
  const { personId } = useParams();

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { id: personId },
  });

  if (loading)
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );

  if (error)
    notification.error({
      message: "Error Occured!",
      description: `${error.message}`,
    });

  console.log(data.person.data);

  const person = data?.person?.data;

  return (
    <>
      <Divider>Update Person</Divider>
      <PersonForm person={person} />
    </>
  );
};

export default UpdatePerson;
