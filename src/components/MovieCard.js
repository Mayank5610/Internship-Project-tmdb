import { Button, Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`movies-card/${movie.id}`);
  };

  return (
    <>
      <Card
        hoverable
        extra={
          <Button type="primary" onClick={handleCardClick}>
            Details
          </Button>
        }
        cover={
          <img
            style={{ width: "150px", height: "200px", padding: "15px" }}
            alt={movie.title}
            src={movie.originalTitle}
          />
        }
        onClick={handleCardClick}
      >
        <Card.Meta
          title="Overview"
          description={`Overview ${movie.overview}`}
        />
        <Card.Meta title="Languages" description={movie.originalLanguage} />
        <Card.Meta title="Release Date" description={movie.releaseDate} />
      </Card>
    </>
  );
};

export default MovieCard;
