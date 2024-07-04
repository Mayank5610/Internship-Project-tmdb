import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_LIST_MOVIES } from "../graphql/Queries";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Typography,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { DELETE_MOVIE } from "../graphql/Mutations";

const { Option } = Select;
const { Text } = Typography;

const Movies = () => {
  const [moreMovies, setMoreMovies] = useState(true);
  const [sort, setSort] = useState("DESC"); // Default value
  const [category, setCategory] = useState("LATEST"); // Default value
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();

  const authToken = localStorage.getItem("accessToken");

  const { loading, error, data, fetchMore } = useQuery(GET_LIST_MOVIES, {
    variables: {
      limit: 10,
      skip: 0,
      order: sort,
      category: category,
      //   searchTerm: searchTerm,
    },
  });

  const [deleteMovieData] = useMutation(DELETE_MOVIE, {
    variables: { id: selectedMovie },
    onCompleted: () => {
      notification.success({
        message: "Movie Deletion Completed!",
        description: "Movie Deleted Successfully!",
      });
      fetchMore({
        variables: {
          limit: 10,
          skip: 0,
          order: sort,
          category: category,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          return fetchMoreResult;
        },
      });
    },

    onError: () => {
      notification.error({
        message: "Error Occured!",
        description: `${error.message}`,
      });
    },
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
    return notification.error({
      message: "Error Occured!",
      description: `${error.message}`,
    });

  //   console.log(data);

  const fetchMoreMovies = () => {
    fetchMore({
      variables: {
        skip: filteredMovies.length,
        order: sort,
        category: category,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          setMoreMovies(false);
          return previousResult;
        }
        return {
          ...previousResult,
          listMovies: {
            ...previousResult.listMovies,
            data: [
              ...previousResult.listMovies.data,
              ...fetchMoreResult.listMovies.data,
            ],
          },
        };
      },
    });
  };

  const { listMovies } = data;
  const { data: movies } = listMovies;

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSortChange = (value) => {
    setSort(value);
    fetchMore({
      variables: { limit: 10, skip: 0, order: value, category: category },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return fetchMoreResult;
      },
    });
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    fetchMore({
      variables: { limit: 10, skip: 0, order: sort, category: value },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return fetchMoreResult;
      },
    });
  };

  const showDetails = (movieId) => {
    console.log(movieId);
    navigate(`/movies-card/${movieId}`);
  };

  const handleDeleteModalVisible = (id) => {
    setSelectedMovie(id);
    setIsModalVisible(true);
    // console.log("selectedMovie ", selectedMovie);
  };

  const handleDelete = () => {
    deleteMovieData();
    setIsModalVisible(false);
  };

  const handleDeleteModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {authToken ? (
        <>
          <Divider>Movies List</Divider>
          <Row gutter={[16, 24]}>
            <Col
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              xxl={4}
            >
              Sort By:{" "}
              <Select
                defaultValue={sort}
                onChange={handleSortChange}
                style={{ width: "200px" }}
              >
                <Option value="ASC">Ascending</Option>
                <Option value="DESC">Descending</Option>
              </Select>
            </Col>
            <Col
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              xxl={4}
            >
              Category:{" "}
              <Select
                defaultValue={category}
                onChange={handleCategoryChange}
                style={{ width: "200px" }}
              >
                <Option value="LATEST">Latest</Option>
                <Option value="PLAYING_IN_THEATERS">Playing in Theaters</Option>
                <Option value="POPULAR">Popular</Option>
                <Option value="TOP_RATED">Top Rated</Option>
                <Option value="UPCOMING">Upcoming</Option>
              </Select>
            </Col>
            <Col
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              xxl={4}
            >
              <Input
                placeholder="Search Movies"
                value={searchTerm}
                style={{ width: "200px" }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              xxl={4}
            >
              <Button
                type="primary"
                onClick={() => navigate(`/movies-card/create`)}
              >
                Add New Movie
              </Button>
            </Col>
          </Row>
          <InfiniteScroll
            dataLength={filteredMovies.length}
            next={fetchMoreMovies}
            hasMore={moreMovies}
          >
            <Row gutter={[16, 24]}>
              {filteredMovies.map((movie, index) => (
                <Col key={index} xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
                  <Card
                    hoverable
                    extra={
                      <Button
                        type="primary"
                        onClick={() => showDetails(movie.id)}
                      >
                        Details
                      </Button>
                    }
                    cover={
                      <img
                        style={{
                          width: "150px",
                          height: "200px",
                          padding: "15px",
                        }}
                        alt={movie.title}
                        src={movie.originalTitle}
                        onClick={() => showDetails(movie.id)}
                      />
                    }
                    actions={[
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleDeleteModalVisible(movie.id)}
                      >
                        Delete
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title="Movie Title"
                      description={<Text ellipsis>{movie.title}</Text>}
                    />
                    <Card.Meta
                      title="Overview"
                      description={<Text ellipsis>{movie.overview}</Text>}
                    />
                    <Card.Meta
                      title="Languages"
                      description={
                        <Text ellipsis>{movie.originalLanguage}</Text>
                      }
                    />
                    <Card.Meta
                      title="Release Date"
                      description={<Text ellipsis>{movie.releaseDate}</Text>}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </InfiniteScroll>

          <Modal
            title="Confirm Delete"
            open={isModalVisible}
            onOk={handleDelete}
            onCancel={handleDeleteModalClose}
            footer={[
              <Space>
                <Button type="primary" danger onClick={handleDelete}>
                  Delete
                </Button>
                <Button onClick={handleDeleteModalClose}>Cancel</Button>
              </Space>,
            ]}
          >
            Are you sure you want to delete movie with id "{selectedMovie}"?
          </Modal>
        </>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Movies;
