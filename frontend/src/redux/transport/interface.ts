export type TypeTransport = "dumptruck" | "excavator" | "bulldozer"

export interface Transport {
    speed: number
    id: string
    operating_weight: string
    current_place: string
    vin: string
    type: TypeTransport
    power: number
    unloading_height: number
    current_creator: string
    is_job: boolean
}

export interface TransportState {
    transports: Transport[]
    isLoading: boolean
    error?: string | null | unknown
}
