import React from "react";
import { useMutation } from "@apollo/client";
import { CREATE_MOVIE } from "../graphql/Mutations";
import { Col, Divider, Row } from "antd";
import MovieForm from "./MovieForm";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    navigate(-1);
  };

  return (
    <>
      <Divider>Add New Movie Form</Divider>
      <MovieForm onCompleted={handleComplete} />
    </>
  );
};

export default AddMovie;
