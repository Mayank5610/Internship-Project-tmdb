import React, { useState } from "react";
import { CREATE_PERSON } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  notification,
} from "antd";
import { GET_LIST_PERSONS } from "../graphql/Queries";

const PersonForm = ({ isCompleted }) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [createPerson, { error }] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: GET_LIST_PERSONS }],
    awaitRefetchQueries: true,
    onCompleted: (data) => {
      console.log("Person created: ", data);
      notification.success({
        message: "Person Creation Successful!",
        description: "Person created Successfully!",
      });
      navigate(`/persons-list`);
    },
  });

  if (error)
    return notification.error({
      message: "Error Occured!",
      description: `${error.message}`,
    });

  const onFinish = (values) => {
    const variables = {
      name: values.name || null,
      gender: values.gender || null,
      biography: values.biography || null,
      birthday: values.birthday ? values.birthday : null,
      adult: values.adult || null,
      placeOfBirth: values.placeOfBirth || null,
      alsoKnownAs: values.alsoKnownAs || [],
    };
    console.log("Variables: ", variables);

    createPerson({ variables });
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: "",
          gender: "",
          biography: "",
          birthday: "",
          adult: false,
          placeOfBirth: "",
          alsoKnownAs: [],
        }}
      >
        <Row gutter={[16, 24]}>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input the name!" }]}
            >
              <Input style={{ width: "200px" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="Gender" name="gender">
              <Radio.Group>
                <Radio value="MALE">Male</Radio>
                <Radio value="FEMALE">Female</Radio>
                <Radio value="OTHER">Others</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="Biography" name="biography">
              <Input style={{ width: "200px" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="Birthday" name="birthday">
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="Adult" name="adult">
              <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="Place of Birth" name="placeOfBirth">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item label="Also Known As" name="alsoKnownAs">
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Enter aliases"
              ></Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6} xxl={4}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add New Person
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PersonForm;
