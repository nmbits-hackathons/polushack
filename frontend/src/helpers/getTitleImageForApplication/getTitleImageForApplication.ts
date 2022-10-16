import BuldozerImg from "assets/images/transport/buldozer.png"
import ExcavatorImg from "assets/images/transport/excavator.png"
import DumptruckImg from "assets/images/transport/dumptruck.png"
import FlagImg from "assets/images/transport/flag.png"

import {TypeTransport} from "redux/transport";

export const getTitleImageForApplication = (type: TypeTransport) => {
    if (type === "dumptruck") return DumptruckImg;
    if (type === "excavator") return ExcavatorImg;
    if (type === "bulldozer") return BuldozerImg;
    return FlagImg;
}