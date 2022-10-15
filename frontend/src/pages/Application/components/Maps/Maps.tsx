import React, { useState } from "react"
import { YMaps, Map, Placemark } from "react-yandex-maps"

interface MapsProps {
    handleChangeValue: (key: string, value: string) => void
}
const Maps = ({ handleChangeValue }: MapsProps) => {
    const [coords, setCoords] = useState([55.684758, 37.738521])
    const handleClick = (e: any) => {
        const newCoords = e.get("coords")
        handleChangeValue("to_place", `${newCoords[0]},${newCoords[1]}`)
        setCoords(newCoords)
    }
    return (
        <YMaps>
            <Map
                width="100%"
                defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                onClick={handleClick}
            >
                <Placemark geometry={coords} />
            </Map>
        </YMaps>
    )
}

export default Maps
