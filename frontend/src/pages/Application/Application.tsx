import React, { useEffect, useState } from "react"
import { Spin } from "antd"
import { useAppDispatch, useAppSelector } from "redux/inerface"
import {
    applicationsSelector,
    isLoadingApplication
} from "redux/application/selectors"
import {
    addNewApplication,
    CreateApplicationDto,
    getApplications
} from "redux/application"
import BlueClock from "assets/icons/BlueClock"
import AddApplicationModal from "./components/AddApplicationModal"
import Header from "../../components/Header"
import Card from "../../components/Card"
import { getTitleImageForApplication } from "helpers/getTitleImageForApplication"
import "./application.css"
import { getTypeName } from "helpers/getTypeName"
import { userSelector } from "redux/auth"
import { mockUser } from "../../api"

const Application = () => {
    const dispatch = useAppDispatch()
    const applications = useAppSelector(applicationsSelector)
    const isLoading = useAppSelector(isLoadingApplication)
    const user = useAppSelector(userSelector)
    const [openAddApplicationModal, setOpenAddApplicationModal] =
        useState(false)
    useEffect(() => {
        dispatch(getApplications(user || mockUser))
    }, [])

    const handleAddApplication = () => {
        setOpenAddApplicationModal((prev) => !prev)
    }
    const handleSubmit = (data: CreateApplicationDto) => {
        dispatch(addNewApplication(data))
        setOpenAddApplicationModal(false)
    }
    return (
        <div className="application-wrapper">
            <AddApplicationModal
                open={openAddApplicationModal}
                handleChangeViewModal={setOpenAddApplicationModal}
                handleSubmitModal={handleSubmit}
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
                                title={application.title}
                                titleImage={getTitleImageForApplication(
                                    application.type
                                )}
                                description={`Тип: ${getTypeName(
                                    application.type
                                )}`}
                                firstIcon={BlueClock}
                                firstInformation="1.13"
                                secondIcon={BlueClock}
                                secondInformation={application.time_start}
                                status={application.status}
                                tableDescription={[
                                    {
                                        title: "Номер машины",
                                        value: application.vin || "не назначено"
                                    },
                                    {
                                        title: "Начало работы",
                                        value: application.time_start
                                    },
                                    {
                                        title: "Завершение работы",
                                        value: application.time_end
                                    }
                                ]}
                                forFullDescription={application.description}
                                transportCoords={application.current_place}
                                placeCoords={application.to_place}
                            />
                        )
                    })}
                </div>
            </Spin>
        </div>
    )
}

export default Application
