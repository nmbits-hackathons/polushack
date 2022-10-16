import { UserState } from "redux/auth"
import { Application } from "redux/application"
import { Transport } from "redux/transport"

export const getTransportsForUser = (
    user: UserState,
    applications: Application[],
    transports: Transport[]
): Transport[] => {
    if (user.position === "dispatcher") return transports
    const vinTransportsForUser = applications.map((el) => el.vin || "")
    return transports.filter((el) =>
        vinTransportsForUser.some((vin) => vin === el.vin)
    )
}
