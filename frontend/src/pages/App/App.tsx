import React, { useEffect } from "react"
import { Layout, Spin, Typography } from "antd"
import "antd/dist/antd.css"
import { Routes, Route } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "redux/inerface"
import { isAuthSelector, isLoadingLogin, isSession } from "redux/auth"
import { routs } from "constants/rout"
import SideBar from "../../components/SideBar"

const {
    Footer: LayoutFooter,
    Sider: LayoutSider,
    Content: LayoutContent
} = Layout

const App = () => {
    const myStorage = window.localStorage
    const token = myStorage.getItem("SID")
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(isAuthSelector)
    const isLoading = useAppSelector(isLoadingLogin)
    useEffect(() => {
        if (token) {
            dispatch(isSession(token))
        }
    }, [])

    return (
        <Spin
            tip="Loading..."
            size="large"
            delay={52}
            style={{ maxHeight: "100vh" }}
            spinning={isLoading}
        >
            <Layout style={{ height: "100vh" }}>
                <Layout>
                    {isAuth && (
                        <LayoutSider theme="light">
                            <SideBar />
                        </LayoutSider>
                    )}
                    <Layout>
                        <LayoutContent
                            style={{
                                display: "flex",
                                flexFlow: "column",
                                alignContent: "center",
                                justifyContent: "center",
                                background: "#E8EEF6"
                            }}
                        >
                            <Routes>
                                {routs.map(
                                    ({ path, Element, isAuthValue }) =>
                                        isAuth === isAuthValue && (
                                            <Route
                                                key={path}
                                                element={<Element />}
                                                {...{ path }}
                                            />
                                        )
                                )}
                            </Routes>
                        </LayoutContent>
                        {isAuth && (
                            <LayoutFooter
                                style={{
                                    boxShadow:
                                        "0px 0px 8px rgba(0, 16, 38, 0.08)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    padding: "12px 12px"
                                }}
                            >
                                <Typography.Text>
                                    Copyright © 2022 All rights reserved
                                </Typography.Text>
                            </LayoutFooter>
                        )}
                    </Layout>
                </Layout>
            </Layout>
        </Spin>
    )
}

export default App
