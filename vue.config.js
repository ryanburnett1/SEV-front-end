module.exports = {
  transpileDependencies: ["vuetify"],
  configureWebpack: {
      mode: process.env.NODE_ENV !== ‘development’ ? ‘production’ : ‘development’
  }
  // publicPath: process.env.NODE_ENV === "production" ? '/' : '/',
};
