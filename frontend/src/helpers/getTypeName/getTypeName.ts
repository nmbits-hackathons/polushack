import { TypeTransport } from "redux/transport"

export const getTypeName = (type: TypeTransport): string => {
    if (type === "dumptruck") return "Кран"
    if (type === "excavator") return "Экскаватор"
    if (type === "bulldozer") return "Бульдозер"
    return ""
}
