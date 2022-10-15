import {CreateApplicationDto} from "redux/application";

export const typesTransportSelect = [
    {
        key: "bulldozer",
        title: "Бульдозер",
        value: "bulldozer"
    },
    {
        key: "dumptruck",
        title: "Кран",
        value: "dumptruck"
    },
    {
        key: "excavator",
        title: "Экскаватор",
        value: "excavator"
    }
]

export const prioritySelect = [
    {
        key: "low",
        title: "низкий",
        value: "low"
    },
    {
        key: "medium",
        title: "средний",
        value: "medium"
    },
    {
        key: "high",
        title: "высокий",
        value: "high"
    }
]

export const initState: CreateApplicationDto = {
    title: "",
    description: "",
    type: "dumptruck",
    speed: 5,
    power: 5,
    operating_weight: 10,
    unloading_height: 15,
    creator: "",
    time_start: "",
    time_end: "",
    priority: "low",
    to_place: ""
}