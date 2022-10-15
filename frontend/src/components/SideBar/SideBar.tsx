import React, { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "redux/inerface"
import { Divider, Menu, Card, Avatar } from "antd"
import {
    UserOutlined,
    SettingOutlined,
    ImportOutlined,
    GlobalOutlined,
    AppstoreOutlined,
    CarOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons"
import { userSelector, logOut } from "redux/auth"
import Logo from "assets/images/logo.png"
import "./sideBar.css"
import {
    MAIN_PATH,
    MAPS_PATH,
    TRANSPORT_PATH,
    USERS_PATH
} from "constants/path"

interface MenuInfo {
    key: string
    keyPath: string[]
    item: React.ReactInstance
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
}

const { Meta } = Card

const SideBar = () => {
    const dispatch = useAppDispatch()
    const myStorage = window.localStorage
    const navigate = useNavigate()
    const user = useAppSelector(userSelector)
    const menuItems = useMemo(() => {
        if (user?.position === "dispatcher") {
            return [
                {
                    label: "Заявки",
                    key: MAIN_PATH,
                    icon: <AppstoreOutlined />
                },
                {
                    label: "Пользователи",
                    key: USERS_PATH,
                    icon: <UsergroupAddOutlined />
                },
                {
                    label: "Транспорт",
                    key: TRANSPORT_PATH,
                    icon: <CarOutlined />
                },
                {
                    label: "Карты",
                    key: MAPS_PATH,
                    icon: <GlobalOutlined />
                }
            ]
        }
        return [
            {
                label: "Карта",
                key: MAPS_PATH,
                icon: <GlobalOutlined />
            },
            {
                label: "Мои заявки",
                key: MAIN_PATH,
                icon: <AppstoreOutlined />
            }
        ]
    }, [user?.position])

    const [selectedKey, setSelectedKey] = useState(
        user?.position === "dispatcher" ? MAIN_PATH : MAPS_PATH
    )
    const handleSelectMenuItem = ({ key }: MenuInfo) => {
        setSelectedKey(key)
        navigate(key)
    }

    const handleLogOut = () => {
        dispatch(logOut())
        myStorage.clear()
    }

    return (
        <>
            <Card
                className="sidebar-card"
                actions={[
                    <SettingOutlined />,
                    <ImportOutlined onClick={() => handleLogOut()} />
                ]}
                bodyStyle={{
                    display: "flex",
                    flexFlow: "column nowrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "15px 15px"
                }}
            >
                <>
                    <Avatar src={Logo} className="sideBar-logo" />
                    <Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={user?.name}
                        description={
                            user?.position === "dispatcher"
                                ? "Диспетчер"
                                : "Водитель"
                        }
                    />
                </>
            </Card>
            <Divider type="vertical" />
            <Menu
                style={{ width: "100%", padding: "10px 10px" }}
                defaultSelectedKeys={[selectedKey]}
                items={menuItems}
                onSelect={handleSelectMenuItem}
            />
        </>
    )
}

export default SideBar
