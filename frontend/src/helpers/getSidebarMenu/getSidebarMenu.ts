import { UserPosition } from "redux/auth";
import { MAIN_PATH, MAPS_PATH, TRANSPORT_PATH, USERS_PATH } from "constants/path";

interface PropsMenu {
  userRole: UserPosition | null
}

export const getSidebarMenu = ({
  userRole,
}: PropsMenu) => {
  if (userRole === "dispatcher") {
    return [
      {
        label: "Заявки",
        key: MAIN_PATH,
      },
      {
        label: "Пользователи",
        key: USERS_PATH,
      },
      {
        label: "Транспорт",
        key: TRANSPORT_PATH,
      },
      {
        label: "Карты",
        key: MAPS_PATH,
      },
    ];
  }
  return [
    {
      label: "Мои заявки",
      key: MAIN_PATH,
    },
  ];
};