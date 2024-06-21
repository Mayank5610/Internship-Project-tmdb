import { Form } from "antd";
import React from "react";

const MovieForm = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Form form={form}></Form>
    </>
  );
};

export default MovieForm;
