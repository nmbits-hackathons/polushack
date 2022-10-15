import axios from "axios"
import withMock from "../withMock"
import { getConfig } from "constants/configRequest"
import { Transport, TypeTransport } from "redux/transport"
import { GET_TRANSPORT_API } from "constants/path"

const isMock = process.env.IS_MOCK === "true"

const mockTransports: Transport[] = [
    {
        id: "test-id-1",
        operating_weight: "23",
        current_place: "56.58643328402244,37.29676133203371",
        vin: "239",
        type: "dumptruck" as TypeTransport,
        speed: 20,
        power: 20,
        unloading_height: 20,
        current_creator: "meneger-1",
        is_job: true
    },
    {
        id: "test-id-1",
        operating_weight: "23",
        current_place: "58.58643328402244,39.29676133203371",
        vin: "444",
        type: "excavator" as TypeTransport,
        speed: 20,
        power: 20,
        unloading_height: 20,
        current_creator: "meneger-1",
        is_job: false
    },
    {
        id: "test-id-1",
        operating_weight: "23",
        current_place: "57.58643328402244,38.29676133203371",
        vin: "2392",
        type: "bulldozer" as TypeTransport,
        speed: 20,
        power: 20,
        unloading_height: 20,
        current_creator: "meneger-1",
        is_job: false
    }
]

export const getTransportsApi = async () => {
    if (isMock) return withMock(mockTransports)
    const { data } = await axios.get(GET_TRANSPORT_API, getConfig())
    return data.series
}
