import React from "react"
import { YMaps, Map, Placemark } from "react-yandex-maps"

interface MapsProps {
    transportCoords?: string
    placeCoords: string
}

const Maps = ({ transportCoords, placeCoords }: MapsProps) => {
    return (
        <YMaps>
            <Map
                width="100%"
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            >
                {transportCoords && (
                    <Placemark
                        geometry={transportCoords.split(",").map((el) => +el)}
                        options={{
                            preset: "islands#blueAutoCircleIcon",
                            iconColor: "red"
                        }}
                    />
                )}
                <Placemark
                    geometry={placeCoords.split(",").map((el) => +el)}
                    options={{
                        preset: "islands#blueGovernmentCircleIcon",
                        iconColor: "green"
                    }}
                />
            </Map>
        </YMaps>
    )
}

export default Maps
