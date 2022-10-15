import React from "react"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, PageHeader, Input } from "antd"
import "./header.css"

export interface ITabs {
    key: string
    title: string
}

export interface HeaderProps {
    title: string
    titleBtn: string
    onClick: () => void
    tabs?: ITabs
}

const Header = ({ title, titleBtn, onClick }: HeaderProps) => {
    return (
        <PageHeader
            title={title}
            extra={[
                <Input
                    className="header-search"
                    placeholder="Search"
                    suffix={
                         <SearchOutlined style={{ color: "rgba(0,0,0,.45)" , fontSize: "20px"}} />
                    }
                />,
                <Button
                    className="header-btn"
                    key="1"
                    type="primary"
                    icon={<PlusOutlined style={{fontSize: "12px"}} />}
                    {...{ onClick }}
                >
                    {titleBtn}
                </Button>
            ]}
        ></PageHeader>
    )
}

export default Header
