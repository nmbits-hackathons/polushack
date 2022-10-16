const tokenLocal = window.localStorage.getItem("SID")
const typeLocal = window.localStorage.getItem("token_type")

export const getConfig = (type?: string, token?: string) => ({
    headers: {
        Authorization: `${type ? type : typeLocal} ${
            token ? token : tokenLocal
        }`
    }
})
