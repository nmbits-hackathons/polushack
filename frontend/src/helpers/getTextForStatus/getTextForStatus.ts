export const getTextForStatus = (status: string) => {
    if (status === "confirmable") return "Выполнена"
    if (status === "progress") return "В процессе"
    if (status === "cancelled") return "Отменена"
    if (status === "pending") return "Не распределена"
    return "default"
}
