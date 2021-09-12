/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["iOS >= 7", "Android >= 4.0"],
    }),
  ],
}
