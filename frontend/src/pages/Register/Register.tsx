import React from "react"
import { Link } from "react-router-dom"
import { Button, Form, Input, Space } from "antd"
import { useAppSelector } from "redux/inerface"
import { isLoadingLogin } from "redux/auth"
import { LockOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons"
import { BASE_API } from "constants/path"

const Register = () => {
    const isLoading = useAppSelector(isLoadingLogin)

    const handleRegister = () => {}

    return (
        <Form
            onFinish={handleRegister}
            style={{ width: 300, margin: "auto" }}
            layout="vertical"
        >
            <Form.Item
                name="name"
                label="name"
                rules={[
                    {
                        required: true,
                        message: "Please input your name!"
                    }
                ]}
            >
                <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
                name="email"
                label="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your email!"
                    }
                ]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your email"
                />
            </Form.Item>
            <Form.Item
                name="position"
                label="position"
                rules={[
                    {
                        required: true,
                        message: "Please input your position!"
                    }
                ]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Enter your position"
                />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: "Please input your Password!"
                    },
                    {
                        min: 3,
                        message:
                            "The password must be between 6 and 20 characters."
                    },
                    {
                        max: 20,
                        message:
                            "The password must be between 6 and 20 characters."
                    }
                ]}
            >
                <Input
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="Enter your password"
                />
            </Form.Item>
            <Form.Item>
                <Space size={8}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        <LoginOutlined />
                        Register
                    </Button>
                    <span>Or</span>
                    <Link to={BASE_API}>login now!</Link>
                </Space>
            </Form.Item>
        </Form>
    )
}

export default Register
