import React, { useEffect, useState } from "react"
import { Spin } from "antd"
import { useAppDispatch, useAppSelector } from "redux/inerface"
import {
    applicationsSelector,
    isLoadingApplication
} from "redux/application/selectors"
import { getApplications } from "redux/application"
import AddApplicationModal from "./components/AddApplicationModal"
import Header from "../../components/Header"
import Card from "../../components/Card"
import { getTitleImageForApplication } from "../../helpers/getTitleImageForApplication"
import "./application.css"

const Application = () => {
    const dispatch = useAppDispatch()
    const applications = useAppSelector(applicationsSelector)
    const isLoading = useAppSelector(isLoadingApplication)
    const [openAddApplicationModal, setOpenAddApplicationModal] =
        useState(false)
    useEffect(() => {
        dispatch(getApplications())
    }, [])

    const handleAddApplication = () => {
        setOpenAddApplicationModal((prev) => !prev)
    }
    return (
        <div className="application-wrapper">
            <AddApplicationModal
                open={openAddApplicationModal}
                handleChangeViewModal={setOpenAddApplicationModal}
                handleSubmitModal={() => {}}
            />
            <Header
                title="Мои заявки"
                titleBtn="Создать заявку"
                onClick={handleAddApplication}
            />
            <Spin
                tip="Loading..."
                size="large"
                delay={52}
                style={{ maxHeight: "100vh" }}
                spinning={isLoading}
            >
                <div className="applications-block">
                    {applications.map((application) => {
                        return (
                            <Card
                                key={application.id}
                                id={application.id}
                                title={application.creator}
                                titleImage={getTitleImageForApplication(
                                    application.type
                                )}
                                description={`Расстояние: ${Math.floor(
                                    Math.random() * 150 * Math.random() * 10
                                )}`}
                            />
                        )
                    })}
                </div>
            </Spin>
        </div>
    )
}

export default Application
