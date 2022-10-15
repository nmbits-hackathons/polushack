import React from "react"
import Header from "../../components/Header"
import "./application.css"

const Application = () => {
    const handleAddApplication = () => {}
    return (
        <div className="application-wrapper">
            <Header
                title="Мои заявки"
                titleBtn="Создать заявку"
                onClick={handleAddApplication}
            />
        </div>
    )
}

export default Application
