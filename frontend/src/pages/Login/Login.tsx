import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "redux/inerface";
import { isLoadingLogin, isSession, LoginDto } from "redux/auth";
import { loginUserApi } from "../../api";

const Login = () => {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(isLoadingLogin);

  const handleLogin = async (loginDto: LoginDto) => {
    const myStorage = window.localStorage;
    const { data } = await loginUserApi(loginDto);
    myStorage.setItem("SID", data.access_token || "");
    if (data.access_token) {
      dispatch(isSession(data.access_token));
    }
  };

  return <Form
    onFinish={handleLogin}
    style={{ width: 300, alignSelf: "center", justifySelf: "center" }}
    layout="vertical"
  >
    <Form.Item
      name="username"
      label="email"
      rules={[
        {
          required: true,
          message: "Please input your email!",
        },
      ]}
    >
      <Input prefix={<UserOutlined />} placeholder="Enter your email" />
    </Form.Item>
    <Form.Item
      name="password"
      label="Password"
      rules={[
        {
          required: true,
          message: "Please input your Password!",
        },
        {
          min: 3,
          message: "The password must be between 6 and 20 characters.",
        },
        {
          max: 20,
          message: "The password must be between 6 and 20 characters.",
        },
      ]}
    >
      <Input prefix={<LockOutlined />} type="password" placeholder="Enter your password" />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" loading={isLoading} block>
        <LoginOutlined />
        Log in
      </Button>
    </Form.Item>
  </Form>;
};

export default Login;