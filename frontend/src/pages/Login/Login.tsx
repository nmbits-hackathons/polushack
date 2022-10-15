import React from "react"
import { Button, Form, Input } from "antd"
import { LoginOutlined, UserOutlined } from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "redux/inerface"
import { isLoadingLogin, isSession, LoginDto } from "redux/auth"
import { loginUserApi } from "../../api"
import CarImage from "assets/images/car-main.png"
import "./login.css"

const Login = () => {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector(isLoadingLogin)

    const handleLogin = async (loginDto: LoginDto) => {
        const myStorage = window.localStorage
        const { data } = await loginUserApi(loginDto)
        myStorage.setItem("SID", data.access_token || "")
        if (data.access_token) {
            dispatch(isSession(data.access_token))
        }
    }

    return (
        <div className="login-wrapper">
            <Form
                className="login-form"
                onFinish={handleLogin}
                style={{
                    width: 545,
                    height: 475
                }}
                layout="vertical"
            >
                <h1 className="form-title">Вход в систему</h1>
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!"
                        }
                    ]}
                >
                    <Input
                        className="form-input"
                        prefix={<UserOutlined />}
                        placeholder="Enter your email"
                    />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
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
                        className="form-input"
                        type="password"
                        placeholder="Enter your password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        className="form-btn"
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        block
                    >
                        <LoginOutlined />
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            <img className="login-image" src={CarImage} alt="картинка машины" />
        </div>
    )
}

export default Login
