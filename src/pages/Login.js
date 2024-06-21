import { useMutation } from "@apollo/client";
import React from "react";
import { LOGIN_EMAIL_PASSWORD } from "../graphql/Mutations";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Spin, notification } from "antd";

const Login = () => {
  const [login, { loading, error, data }] = useMutation(LOGIN_EMAIL_PASSWORD);

  const navigate = useNavigate();

  const [form] = Form.useForm();

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
      message: "Error occured",
      description: `${error.message}`,
    });

  if (data) console.log(data);

  const onFinish = async (values) => {
    try {
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      localStorage.setItem("accessToken", data.emailPasswordLogIn.data.token);
      notification.success({
        message: "Login Successful!",
        description: "You are logged in!",
      });
      navigate("/");
    } catch (error) {
      notification.error({
        message: "An Error Occured!",
        description: `${error}`,
      });
    }
  };

  return (
    <>
      <Form form={form} name="login" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter yout email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
