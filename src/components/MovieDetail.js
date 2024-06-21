import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_MOVIE_DETAILS } from "../graphql/Queries";
import {
  Button,
  Card,
  Descriptions,
  Spin,
  Typography,
  notification,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_MOVIE_DETAILS, {
    variables: { id: movieId },
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

  const movie = data?.movie?.data;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Button
        style={{
          margin: "10px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        }}
        type="primary"
        onClick={handleBack}
      >
        <ArrowLeftOutlined />
      </Button>
      <Title level={2}>{movie.title}</Title>
      <Card>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Image">
            <img
              style={{ width: "150px", height: "200px" }}
              src={movie.originalTitle}
              alt={movie.title}
            />
          </Descriptions.Item>
          <Descriptions.Item label="ID">{movie.id}</Descriptions.Item>
          <Descriptions.Item label="Overview">
            {movie.overview}
          </Descriptions.Item>
          <Descriptions.Item label="Adult">
            {movie.adult ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Original Language">
            {movie.originalLanguage}
          </Descriptions.Item>
          <Descriptions.Item label="Popularity">
            {movie.popularity}
          </Descriptions.Item>
          <Descriptions.Item label="Budget">{movie.budget}</Descriptions.Item>
          <Descriptions.Item label="Revenue">{movie.revenue}</Descriptions.Item>
          <Descriptions.Item label="Release Date">
            {movie.releaseDate}
          </Descriptions.Item>
          <Descriptions.Item label="Runtime">
            {movie.runtime} minutes
          </Descriptions.Item>
          <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
          <Descriptions.Item label="Tagline">{movie.tagline}</Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default MovieDetail;
