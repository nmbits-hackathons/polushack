import React, { useEffect, useState } from "react"
import { Spin } from "antd"
import { YMaps, Map, Placemark } from "react-yandex-maps"
import { useAppSelector, useAppDispatch } from "redux/inerface"
import { userSelector } from "redux/auth"
import {
    getTransports,
    getTransportsSelector,
    isLoadingTransports,
    Transport
} from "redux/transport"
import { applicationsSelector } from "redux/application/selectors"
import { getTransportsForUser } from "helpers/getTransportsForUser"
import { mockUser } from "../../api"

const Maps = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(userSelector)
    const transports = useAppSelector(getTransportsSelector)
    const isLoading = useAppSelector(isLoadingTransports)
    const applications = useAppSelector(applicationsSelector)
    const [showTransports, setShowTransports] = useState<Transport[]>([])

    useEffect(() => {
        dispatch(getTransports())
    }, [])

    useEffect(() => {
        setShowTransports(
            getTransportsForUser(user || mockUser, applications, transports)
        )
    }, [transports])
    return (
        <Spin
            tip="Loading..."
            size="large"
            delay={52}
            style={{ maxHeight: "100vh" }}
            spinning={isLoading}
        >
            <div className="pages-maps">
                <div className="pages-maps-map">
                    <YMaps>
                        <Map
                            width="100%"
                            height={"100vh"}
                            defaultState={{ center: [55.75, 37.57], zoom: 7 }}
                        >
                            {showTransports.map(({ current_place, is_job }) => (
                                <Placemark
                                    geometry={current_place
                                        .split(",")
                                        .map((el) => +el)}
                                    options={{
                                        preset: "islands#blueAutoCircleIcon",
                                        iconColor:
                                            user?.position === "dispatcher" &&
                                            is_job
                                                ? "red"
                                                : "green"
                                    }}
                                />
                            ))}
                        </Map>
                    </YMaps>
                </div>
            </div>
        </Spin>
    )
}

export default Maps
