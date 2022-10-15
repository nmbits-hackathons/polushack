const token = window.localStorage.getItem("SID");
const type = window.localStorage.getItem("token_type");

export const config = {
    headers: {
        "Authorization": type + " " + token,
    },
}