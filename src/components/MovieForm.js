import React from "react";
import { useMutation } from "@apollo/client";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import { CREATE_MOVIE, UPDATE_MOVIE } from "../graphql/Mutations";
import { GET_LIST_MOVIES } from "../graphql/Queries";
import moment from "moment/moment";

const MovieForm = ({ movie }) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [mutationFunction, { error }] = useMutation(
    movie ? UPDATE_MOVIE : CREATE_MOVIE,
    {
      refetchQueries: [{ query: GET_LIST_MOVIES }],
      awaitRefetchQueries: true,
      onCompleted: () => {
        const action = movie ? "Updated" : "Added";
        notification.success({
          message: `Movie ${action} Successful!`,
          description: `Movie ${action} Successfully!`,
        });
        navigate(`/movies-card`);
      },
    }
  );

  let initialValues;
  if (movie) {
    console.log("Release Date: ", movie.releaseDate);
    initialValues = {
      title: movie.title,
      overview: movie.overview,
      adult: movie.adult,
      budget: movie.budget,
      originalLanguage: movie.originalLanguage,
      originalTitle: movie.originalTitle,
      releaseDate: moment(movie.releaseDate).isValid()
        ? moment(movie.releaseDate)
        : null,
      revenue: movie.revenue,
      runtime: movie.runtime,
      status: movie.status,
      tagline: movie.tagline,
    };
  } else {
    initialValues = {
      title: "",
      overview: "",
      adult: false,
      budget: 0,
      originalTitle: "",
      originalLanguage: "",
      releaseDate: "",
      revenue: 0,
      runtime: 0,
      status: "",
      tagline: "",
    };
  }

  if (error)
    return notification.error({
      message: "Error Occured!",
      description: `${error.message}`,
    });

  const handleSubmit = (values) => {
    const formattedReleaseDate = values.releaseDate
      ? moment(values.releaseDate).toISOString()
      : null;

    const variables = {
      title: values.title,
      overview: values.overview,
      adult: values.adult,
      budget: parseInt(values.budget),
      originalLanguage: values.originalLanguage,
      originalTitle: values.originalTitle,
      releaseDate: formattedReleaseDate,
      revenue: parseInt(values.revenue),
      runtime: parseInt(values.runtime),
      status: values.status,
      tagline: values.tagline,
    };
    console.log(variables);
    if (movie) {
      mutationFunction({ variables: { ...variables, id: movie.id } });
    } else {
      mutationFunction({ variables });
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the title!" }]}
            >
              <Input style={{ width: "200px" }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              name="overview"
              label="Overview"
              rules={[
                { required: true, message: "Please input the overview!" },
              ]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              label="Adult"
              name="adult"
              rules={[
                { required: true, message: "Please select the adult option!" },
              ]}
            >
              <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              name="budget"
              label="Budget"
              rules={[{ required: true, message: "Please input the budget!" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              name="originalTitle"
              label="Original Title"
              rules={[
                {
                  required: true,
                  message: "Please input the original title!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              name="originalLanguage"
              label="Original Language"
              rules={[
                {
                  required: true,
                  message: "Please input the original language!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              name="releaseDate"
              label="Release Date"
              rules={[
                { required: true, message: "Please input the release date!" },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" needConfirm />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              name="revenue"
              label="Revenue"
              rules={[{ required: true, message: "Please input the revenue!" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              name="runtime"
              label="Runtime"
              rules={[{ required: true, message: "Please input the runtime!" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please input the status!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              name="tagline"
              label="Tagline"
              rules={[{ required: true, message: "Please input the tagline!" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {movie ? "Update Movie" : "Add Movie"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default MovieForm;
