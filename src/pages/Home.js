import { useQuery } from "@apollo/client";
import React from "react";
import { TOP_RATED_MOVIES } from "../graphql/Queries";
import { Col, Row, Spin, notification } from "antd";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const { loading, error, data } = useQuery(TOP_RATED_MOVIES);

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

  return (
    <>
      <Row gutter={[16, 24]}>
        {data.movies.data.map((movie) => (
          <Col key={movie.id} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
