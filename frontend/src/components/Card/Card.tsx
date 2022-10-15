import React from "react"
import { Tag } from "antd"
import { getColorForStatus } from "helpers/getColorForStatus"
import { getTextForStatus } from "helpers/getTextForStatus"
import "./Card.css"

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
}

const Card = ({
    id,
    title,
    description,
    titleImage,
    firstInformation,
    firstIcon: FirstIcon,
    secondInformation,
    secondIcon,
    status
}: CardProps) => {
    return (
        <div className="card-wrapper">
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
                <FirstIcon />
                <div className="card-time-info">{firstInformation}</div>
            </div>
            <div className="card-status">
                <Tag color={getColorForStatus(status)}>
                    {getTextForStatus(status)}
                </Tag>
            </div>
            <div className="card-action"></div>
            <div className="card-drop"></div>
        </div>
    )
}

export default Card
