import React from "react";
import MovieForm from "./MovieForm";
import { Divider } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_DETAILS } from "../graphql/Queries";

const UpdateMovie = () => {
  const { movieId } = useParams();
  const { loading, error, data } = useQuery(GET_MOVIE_DETAILS, {
    variables: { id: movieId },
  });

  //   console.log("Data: ", data);

  const movie = data?.movie?.data;

  return (
    <>
      <Divider>Update Movie</Divider>
      <MovieForm movie={movie} />
    </>
  );
};

export default UpdateMovie;
