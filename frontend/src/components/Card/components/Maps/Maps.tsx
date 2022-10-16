import React from "react"
import { YMaps, Map, Placemark } from "react-yandex-maps"

interface MapsProps {
    transportCoords?: string
    placeCoords: string
}

const Maps = ({ transportCoords, placeCoords }: MapsProps) => {
    const coordsTo = placeCoords.split(",").map((el) => +el)
    return (
        <YMaps>
            <Map width="100%" defaultState={{ center: coordsTo, zoom: 6 }}>
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
                    geometry={coordsTo}
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
