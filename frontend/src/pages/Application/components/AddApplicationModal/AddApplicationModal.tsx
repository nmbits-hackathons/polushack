import React, { useState } from "react"
import { useAppSelector } from "redux/inerface"
import {
    Modal,
    Form,
    DatePicker,
    Input,
    Col,
    InputNumber,
    Row,
    Slider,
    Spin
} from "antd"
import { CreateApplicationDto } from "redux/application"
import "./addApplicationModal.css"
import {
    prioritySelect,
    typesTransportSelect,
    initState
} from "pages/Application/components/AddApplicationModal/constants"
import Maps from "../Maps"
import { userSelector } from "redux/auth"
import { isLoadingApplication } from "redux/application/selectors"

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
    const user = useAppSelector(userSelector)
    const isLoading = useAppSelector(isLoadingApplication)
    const [formValue, setFormValue] = useState<CreateApplicationDto>({
        ...initState,
        creator: user?.email || ""
    })
    const handleChangeValue = (key: string, value: string | number) => {
        setFormValue((prev) => ({ ...prev, [key]: value }))
    }
    return (
        <Modal
            centered
            onCancel={() => handleChangeViewModal(false)}
            onOk={() => handleSubmitModal(formValue)}
            width={873}
            style={{ borderRadius: "20px" }}
            {...{ open }}
        >
            <Spin
                tip="Loading..."
                size="large"
                delay={52}
                style={{ maxHeight: "100vh" }}
                spinning={isLoading}
            >
                <div className="add-application-modal-wrapper">
                    <h1 className="add-application-modal-title">
                        Новая заявка
                    </h1>
                    <Form
                        initialValues={formValue}
                        layout="vertical"
                        style={{ alignSelf: "center", justifySelf: "center" }}
                    >
                        <div className="add-application-modal-input-block">
                            <Form.Item label="Название заявки" name="title">
                                <Input
                                    className="add-application-modal-input"
                                    value={formValue.title}
                                    onChange={(e) =>
                                        handleChangeValue(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                label="Описание заявки"
                                name="description"
                            >
                                <Input.TextArea
                                    className="add-application-modal-input"
                                    maxLength={500}
                                    value={formValue.description}
                                    onChange={(e) =>
                                        handleChangeValue(
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                            </Form.Item>
                        </div>
                        <div className="add-application-modal-input-block">
                            <Form.Item
                                label="Дата начала перевозки"
                                name="time_start"
                            >
                                <DatePicker
                                    className="add-application-modal-input"
                                    onChange={(data) =>
                                        handleChangeValue(
                                            "time_start",
                                            data?.format() ||
                                                new Date().toString()
                                        )
                                    }
                                    showTime
                                />
                            </Form.Item>
                            <Form.Item
                                label="Дата окончания перевозки"
                                name="time_end"
                            >
                                <DatePicker
                                    className="add-application-modal-input"
                                    onChange={(data) =>
                                        handleChangeValue(
                                            "time_end",
                                            data?.format() ||
                                                new Date().toString()
                                        )
                                    }
                                    showTime
                                />
                            </Form.Item>
                        </div>
                        <div className="add-application-modal-input-block">
                            <Form.Item
                                label="Выбор транспортного средства"
                                name="type"
                            >
                                <select
                                    className="add-application-modal-input"
                                    value={formValue.type}
                                    onChange={(e) =>
                                        handleChangeValue(
                                            "type",
                                            e.target.value
                                        )
                                    }
                                >
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
                                <select
                                    className="add-application-modal-input"
                                    value={formValue.priority}
                                    onChange={(e) =>
                                        handleChangeValue(
                                            "priority",
                                            e.target.value
                                        )
                                    }
                                >
                                    {prioritySelect.map(
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
                        </div>
                        <div className="add-application-modal-input-block">
                            <Form.Item
                                label="Скорость км /ч"
                                name="speed"
                                style={{ width: "55%" }}
                            >
                                <Row>
                                    <Col span={12}>
                                        <Slider
                                            min={1}
                                            max={200}
                                            onChange={(value) =>
                                                handleChangeValue(
                                                    "speed",
                                                    value
                                                )
                                            }
                                            value={formValue.speed}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={20}
                                            style={{ margin: "0 16px" }}
                                            value={formValue.speed}
                                            onChange={(value) =>
                                                handleChangeValue(
                                                    "speed",
                                                    value ?? 0
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item
                                label="Мощность  лош.с."
                                name="power"
                                style={{ width: "55%" }}
                            >
                                <Row>
                                    <Col span={12}>
                                        <Slider
                                            min={1}
                                            max={2000}
                                            onChange={(value) =>
                                                handleChangeValue(
                                                    "power",
                                                    value
                                                )
                                            }
                                            value={formValue.power}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={20}
                                            style={{ margin: "0 16px" }}
                                            value={formValue.power}
                                            onChange={(value) =>
                                                handleChangeValue(
                                                    "power",
                                                    value ?? 0
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </div>
                        <div className="add-application-modal-input-block">
                            <Form.Item
                                label="Эксплуатационная масса, кг"
                                name="unloading_height"
                                style={{ width: "55%" }}
                            >
                                <Row>
                                    <Col span={12}>
                                        <Slider
                                            min={1}
                                            max={200}
                                            onChange={(value) =>
                                                handleChangeValue(
                                                    "unloading_height",
                                                    value
                                                )
                                            }
                                            value={formValue.unloading_height}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={20}
                                            style={{ margin: "0 16px" }}
                                            value={formValue.unloading_height}
                                            onChange={(value) =>
                                                handleChangeValue(
                                                    "unloading_height",
                                                    value ?? 0
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item
                                label="Высота выгрузки, м"
                                name="operating_weight"
                                style={{ width: "55%" }}
                            >
                                <Row>
                                    <Col span={12}>
                                        <Slider
                                            min={1}
                                            max={2000}
                                            onChange={(value) =>
                                                handleChangeValue(
                                                    "operating_weight",
                                                    value
                                                )
                                            }
                                            value={formValue.operating_weight}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={20}
                                            style={{ margin: "0 16px" }}
                                            value={formValue.operating_weight}
                                            onChange={(value) =>
                                                handleChangeValue(
                                                    "operating_weight",
                                                    value ?? 0
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </div>
                    </Form>
                    <Maps handleChangeValue={handleChangeValue} />
                </div>
            </Spin>
        </Modal>
    )
}

export default AddApplicationModal
