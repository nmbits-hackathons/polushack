module.exports = function (api) {
    api.cache(true)

    const presets = [["react-app", { flow: false, typescript: true }]]
    const plugins = [
        [
            "babel-plugin-module-resolver",
            {
                root: ["./src"],
                alias: {
                    "pages/*": "./src/pages/*",
                    "constants/*": "./src/constants/*",
                    "redux/*": "./src/redux/*",
                    "assets/*": "./src/assets/*",
                    "helpers/*": "./src/helpers/*"
                }
            }
        ]
    ]

    return {
        presets,
        plugins
    }
}
