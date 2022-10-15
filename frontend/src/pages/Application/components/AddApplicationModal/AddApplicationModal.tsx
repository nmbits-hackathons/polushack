import React from "react"
import { Modal, Form, DatePicker } from "antd"
import {
    CreateApplicationDto,
} from "redux/application"
import "./addApplicationModal.css"
import {
    prioritySelect,
    typesTransportSelect
} from "pages/Application/components/AddApplicationModal/constants"

interface AddApplicationModalProps {
    handleChangeViewModal: (mode: boolean) => void
    handleSubmitModal: (data: CreateApplicationDto) => void
    open: boolean
}

const AddApplicationModal = ({
    handleChangeViewModal,
    handleSubmitModal,
    open
}: AddApplicationModalProps) => {

     return (
        <Modal
            centered
            onCancel={() => handleChangeViewModal(false)}
            width={873}
            style={{ borderRadius: "20px" }}
            {...{ open }}
        >
            <div className="add-application-modal-wrapper">
                <h1 className="add-application-modal-title">Новая заявка</h1>
                <Form
                    onFinish={handleSubmitModal}
                    layout="vertical"
                    style={{ alignSelf: "center", justifySelf: "center" }}
                >
                    <div className="add-application-modal-input-block">
                        <Form.Item
                            label="Дата начала перевозки"
                            name="time_start"
                        >
                            <DatePicker
                                className="add-application-modal-input"
                                showTime
                            />
                        </Form.Item>
                        <Form.Item
                            label="Дата окончания перевозки"
                            name="time_end"
                        >
                            <DatePicker
                                className="add-application-modal-input"
                                showTime
                            />
                        </Form.Item>
                    </div>
                    <div className="add-application-modal-input-block">
                        <Form.Item
                            label="Выбор транспортного средства"
                            name="type"
                        >
                            <select className="add-application-modal-input">
                                {typesTransportSelect.map(
                                    ({ key, value, title }) => {
                                        return (
                                            <option
                                                className="add-application-modal-input"
                                                {...{ key, value }}
                                            >
                                                {title}
                                            </option>
                                        )
                                    }
                                )}
                            </select>
                        </Form.Item>
                        <Form.Item label="Приоритет заявки" name="priority">
                            <select className="add-application-modal-input">
                                {prioritySelect.map(({ key, value, title }) => {
                                    return (
                                        <option
                                            className="add-application-modal-input"
                                            {...{ key, value }}
                                        >
                                            {title}
                                        </option>
                                    )
                                })}
                            </select>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default AddApplicationModal
