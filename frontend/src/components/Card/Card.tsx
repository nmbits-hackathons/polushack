import React from "react"
import "./Card.css"
export interface CardProps {
    id: string
    titleIcon?: React.Component
    titleImage?: string
    title: string
    description: string
    firstInformation?: string
    firstIcon?: React.Component
    secondInformation?: string
    secondIcon?: React.Component
    status?: string
}

const Card = ({
    id,
    title,
    description,
    titleIcon,
    titleImage,
    firstInformation,
    firstIcon,
    secondInformation,
    secondIcon,
    status
}: CardProps) => {
    return (
        <div className="card-wrapper">
            <div className="card-information">
                {titleImage && <img src={titleImage} alt="картинка описания" />}
                <div className="information-main">
                    <p className="information-id">{id}</p>
                    <h2 className="name-title">{title}</h2>
                    <p className="information-description">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
