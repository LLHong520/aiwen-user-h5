var utils = require("./utils");
var config = require("../config");
var isProduction = process.env.NODE_ENV === "production";

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: "src",
    source: "src",
    img: "src",
    image: "xlink:href"
  },
  //添加此选项即可增加 autoprefixer的支持
  postcss : [
    require("autoprefixer")({
      browsers: [
        "> 1%",
        "last 10 versions",
        "not ie <= 8",
        "iOS >= 8",
        "Firefox >= 20",
        "Android > 4.4"]
    })
  ]
};
