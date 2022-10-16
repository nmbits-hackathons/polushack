import axios from "axios"
import { ADD_APPLICATION, GET_APPLICATION } from "constants/path"
import { Application, CreateApplicationDto } from "redux/application"
import withMock from "../withMock"
import { getConfig } from "constants/configRequest"
import { UserState } from "redux/auth"

const isMock = process.env.IS_MOCK === "true"

export interface GetApplicationsData {
    counts: number
    applications: Application[]
}

const mockApplications: GetApplicationsData = {
    counts: 3,
    applications: [
        {
            title: "mock title 1",
            description: "mock des 1",
            type: "dumptruck",
            speed: 20,
            power: 20,
            operating_weight: 20,
            unloading_height: 20,
            creator: "asdsa@dadsa.ru",
            time_start: "2022-10-20T07:18:00.854000",
            time_end: "2022-10-21T07:18:00.854000",
            priority: "low",
            to_place: "53.58643328402244,36.29676133203371",
            vin: "239",
            from_place: null,
            distance: null,
            average_time: null,
            status: "pending",
            id: "1",
            current_place: "56.58643328402244,37.29676133203371"
        },
        {
            title: "mock title 2",
            description: "mock des 2",
            type: "excavator",
            speed: 40,
            power: 100,
            operating_weight: 32,
            unloading_height: 56,
            creator: "manager1@example.com",
            time_start: "2022-10-20T07:18:00.854000",
            time_end: "2022-10-21T07:18:00.854000",
            priority: "medium",
            to_place: "55.7074841165816,42.6253746132837",
            vin: "239",
            from_place: null,
            distance: null,
            average_time: null,
            status: "pending",
            id: "2",
            current_place: "56.7074841165816,41.6253746132837"
        },
        {
            title: "mock title 3",
            description: "mock des 3",
            type: "bulldozer",
            speed: 30,
            power: 30,
            operating_weight: 30,
            unloading_height: 30,
            creator: "manager2@example.com",
            time_start: "2022-10-20T07:18:00.854000",
            time_end: "2022-10-21T07:18:00.854000",
            priority: "high",
            to_place: "54.76786332336763,31.726937113283697",
            vin: "",
            from_place: null,
            distance: null,
            average_time: null,
            status: "pending",
            id: "3",
            current_place: ""
        }
    ]
}

export const getApplicationsApi = async (user: UserState) => {
    if (isMock) return withMock(mockApplications)
    const { data } = await axios.get(GET_APPLICATION, getConfig())
    return {
        counts: data.number_of_calendars,
        applications:
            user.position === "customer"
                ? data.series.filter(
                      (el: Application) => el.creator === user.email
                  )
                : data.series
    }
}

export const addNewApplicationApi = async (
    createApplicationDto: CreateApplicationDto
) => {
    if (isMock) return withMock(mockApplications.applications[0])
    const { data } = await axios.post(
        ADD_APPLICATION,
        createApplicationDto,
        getConfig()
    )
    return data
}
