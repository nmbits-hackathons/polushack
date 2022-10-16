export const getColorForStatus = (status: string): string => {
    if (status === "confirmable") return "success"
    if (status === "progress") return "processing"
    if (status === "cancelled") return "error"
    if (status === "pending") return "warning"
    return "default"
}
