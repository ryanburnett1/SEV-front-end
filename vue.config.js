module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: process.env.NODE_ENV === "production" ? '/' : '/',
  apiPath: this.publicPath + process.env.NODE_ENV === "production" ? "api/" : "api/"
};
