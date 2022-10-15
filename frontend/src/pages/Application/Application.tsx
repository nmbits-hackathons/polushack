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
import { getTitleImageForApplication } from "../../helpers/getTitleImageForApplication"
import { initState } from "./components/AddApplicationModal/constants"
import "./application.css"
import { getTypeName } from "../../helpers/getTypeName"

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
                {...{ initState }}
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
                            />
                        )
                    })}
                </div>
            </Spin>
        </div>
    )
}

export default Application
