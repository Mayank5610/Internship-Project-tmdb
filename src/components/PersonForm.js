import React from "react";
import { CREATE_PERSON, UPDATE_PERSON } from "../graphql/Mutations";
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
import moment from "moment/moment";

const PersonForm = ({ person }) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [personMutation, { error }] = useMutation(
    person ? UPDATE_PERSON : CREATE_PERSON,
    {
      refetchQueries: [{ query: GET_LIST_PERSONS }],
      awaitRefetchQueries: true,
      onCompleted: (data) => {
        const action = person ? "Updated" : "Added";
        const message =
          data?.createPerson.message || `Person ${action} Successfully`;
        notification.success({
          message: `Person ${action} Successfully!`,
          description: message,
        });
        navigate(`/persons-list`);
      },
      onError: (data) => {
        notification.error({
          message: "Error Occured!",
          description: `${data.message}`,
        });
        navigate(`/persons-list`);
      },
    }
  );

  let initialValues;
  if (person) {
    initialValues = {
      name: person.name,
      gender: person.gender,
      biography: person.biography,
      birthday: moment(person.birthday).isValid()
        ? moment(person.birthday)
        : null,
      adult: person.adult,
      placeOfBirth: person.placeOfBirth,
      alsoKnownAs: person.alsoKnownAs,
    };
  } else {
    initialValues = {
      name: "",
      gender: "",
      biography: "",
      birthday: "",
      adult: false,
      placeOfBirth: "",
      alsoKnownAs: [],
    };
  }

  if (error) {
    console.warn(error);
    navigate(`/persons-list`);
    return notification.error({
      message: "Error Occured!",
      description: `${error.message}`,
    });
  }

  const handleSubmit = (values) => {
    const formattedBirthDay = values.birthday
      ? moment(values.birthday).toISOString()
      : null;

    const formattedAlsoKnownAs = values.alsoKnownAs.length
      ? values.alsoKnownAs.join(",")
      : null;

    const variables = {
      name: values.name || null,
      gender: values.gender || null,
      biography: values.biography || null,
      birthday: formattedBirthDay,
      adult: values.adult || null,
      placeOfBirth: values.placeOfBirth || null,
      alsoKnownAs: formattedAlsoKnownAs,
    };

    if (person) {
      //   console.log("Person: ", person);
      personMutation({ variables: { ...variables, id: person.id } }).catch(
        (error) => {
          console.error("Mutation Error: ", error);
          notification.error({
            message: "Error Occured!",
            description: `${error.message}`,
          });
        }
      );
    } else {
      personMutation({ variables }).catch((error) => {
        console.error("Mutation Error: ", error);
        notification.error({
          message: "Error Occured!",
          description: `${error.message}`,
        });
      });
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
                {person ? "Update Person" : "Add Person"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default PersonForm;
