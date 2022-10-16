import { TypeTransport } from "redux/transport"

export interface Application {
    title: string
    description: string
    type: TypeTransport
    speed: number
    power: number
    operating_weight: number
    unloading_height: number
    creator: string
    time_start: string
    time_end: string
    priority: PriorityApplication
    to_place: string
    vin: string
    from_place: string | null
    distance: string | null
    average_time: string | null
    status: StatusApplication
    id: string
    current_place: string
}

export interface ApplicationState {
    applications: Application[]
    counts: number
    isLoading: boolean
    error?: string | null | unknown
}

export interface CreateApplicationDto {
    title: string
    description: string
    type: TypeTransport
    speed: number
    power: number
    operating_weight: number
    unloading_height: number
    creator: string
    time_start: string
    time_end: string
    priority: PriorityApplication
    to_place: string
}

export type StatusApplication =
    | "confirmable"
    | "cancelled"
    | "progress"
    | "pending"
    | "active"

// confirmable - заявка которую выполнили успешно
// cancelled - заявка которую  отменили
// progress - заявка которая находится в прогрессе
// pending - заявка которую пока не может принять система из-за времени или других причин, основная работа диспетчера
// active - заявка которая действительная но еще не не начата

export type PriorityApplication = "low" | "medium" | "high"
