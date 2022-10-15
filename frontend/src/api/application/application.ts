import axios from "axios";
import { GET_APPLICATION } from "constants/path"
import { Application } from "redux/application";
import withMock from "../withMock";
import { config } from "constants/configRequest";

const isMock = process.env.IS_MOCK === "true";

export interface GetApplicationsData {
    counts: number;
    applications: Application[]
}

const mockApplications: GetApplicationsData = {
    counts: 3,
    applications: [
        {
            type: "dumptruck",
            speed: 20,
            power: 20,
            operating_weight: 20,
            unloading_height: 20,
            creator: "manager1@example.com",
            time_start: "2022-10-20T07:18:00.854000",
            time_end: "2022-10-21T07:18:00.854000",
            priority: "low",
            to_place: "string",
            vin: "239",
            from_place: null,
            distance: null,
            average_time: null,
            status: "pending",
            id: "1"
        },
        {
            type: "excavator",
            speed: 40,
            power: 100,
            operating_weight: 32,
            unloading_height: 56,
            creator: "manager1@example.com",
            time_start: "2022-10-20T07:18:00.854000",
            time_end: "2022-10-21T07:18:00.854000",
            priority: "medium",
            to_place: "string",
            vin: "239",
            from_place: null,
            distance: null,
            average_time: null,
            status: "pending",
            id: "2"
        },
        {
            type: "buldozer",
            speed: 30,
            power: 30,
            operating_weight: 30,
            unloading_height: 30,
            creator: "manager2@example.com",
            time_start: "2022-10-20T07:18:00.854000",
            time_end: "2022-10-21T07:18:00.854000",
            priority: "high",
            to_place: "string",
            vin: "239",
            from_place: null,
            distance: null,
            average_time: null,
            status: "pending",
            id: "3"
        }
    ]
}

export const getApplicationsApi = async () => {
    if (isMock) return withMock(mockApplications);
    const { data } = await axios.get(GET_APPLICATION, config)
    return {
        counts: data.number_of_calendars,
        applications: data.series
    }
}