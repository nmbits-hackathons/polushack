import React, { useState } from "react"
import { Tag, Button } from "antd"
import {
    EditOutlined,
    DeleteOutlined,
    DownOutlined,
    UpOutlined
} from "@ant-design/icons"
import Maps from "./components/Maps"
import { getColorForStatus } from "helpers/getColorForStatus"
import { getTextForStatus } from "helpers/getTextForStatus"
import "./Card.css"

interface TableDescription {
    title: string
    value: string
}

export interface CardProps {
    id: string
    titleIcon?: React.Component
    titleImage?: string
    title: string
    description: string
    firstInformation: string
    firstIcon: React.FC
    secondInformation: string
    secondIcon: React.FC
    status: string
    tableDescription?: TableDescription[]
    forFullDescription?: string
    transportCoords: string
    placeCoords: string
}

const Card = ({
    id,
    title,
    description,
    titleImage,
    firstInformation,
    firstIcon: FirstIcon,
    secondInformation,
    secondIcon: SecondIcon,
    status,
    tableDescription,
    forFullDescription,
    transportCoords,
    placeCoords
}: CardProps) => {
    const [open, setOpen] = useState(false)
    const handleOpenFullInfo = () => {
        setOpen((prev) => !prev)
    }
    return (
        <div className="card-wrapper">
            <div className="card-wrapper-main">
                <div className="card-information">
                    {titleImage && (
                        <img
                            src={titleImage}
                            alt="картинка описания"
                            className="information-image"
                        />
                    )}
                    <div className="information-main">
                        <p className="information-id">{id}</p>
                        <h2 className="name-title">{title}</h2>
                        <p className="information-description">{description}</p>
                    </div>
                </div>
                <div className="card-time">
                    <FirstIcon />
                    <div className="card-time-info">{firstInformation}</div>
                </div>
                <div className="card-date">
                    <SecondIcon />
                    <div className="card-time-info">{secondInformation}</div>
                </div>
                <div className="card-status">
                    <Tag color={getColorForStatus(status)}>
                        {getTextForStatus(status)}
                    </Tag>
                </div>
                <div className="card-action">
                    <Button
                        type="text"
                        shape="circle"
                        icon={<EditOutlined />}
                        size="middle"
                    />
                    <Button
                        type="text"
                        shape="circle"
                        icon={<DeleteOutlined />}
                        size="middle"
                    />
                </div>
                <div className="card-drop">
                    <Button
                        type="text"
                        shape="circle"
                        icon={open ? <UpOutlined /> : <DownOutlined />}
                        size="middle"
                        onClick={handleOpenFullInfo}
                    />
                </div>
            </div>
            {open && (
                <div className="card-wrapper-full">
                    <div className="wrapper-full-information">
                        {tableDescription &&
                            tableDescription.map((values) => {
                                return (
                                    <div className="full-information-table">
                                        <h2 className="information-table-title">
                                            {values.title}
                                        </h2>
                                        <p className="information-table-description">
                                            {values.value}
                                        </p>
                                    </div>
                                )
                            })}
                        <div className="full-information-description">
                            <h2 className="information-description-title">
                                Описание заявки
                            </h2>
                            <p className="information-description-info">
                                {forFullDescription}
                            </p>
                        </div>
                    </div>
                    <Maps {...{ transportCoords, placeCoords }} />
                </div>
            )}
        </div>
    )
}

export default Card
