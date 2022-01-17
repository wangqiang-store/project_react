const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // api 表示代理路径
    createProxyMiddleware({
      // target 目标服务器的地址，实际地址以项目为准
      target: "http://47.112.167.239:7105",
      // 跨域时一般都设置该值 为 true
      changeOrigin: true,
      ws: false,
      pathRewrite: {
        "^/api": "/",
      },
    })
  );
  app.use(
    "/token", // api 表示代理路径
    createProxyMiddleware({
      // target 目标服务器的地址，实际地址以项目为准
      target: "http://47.112.167.239:7101/token",
      // 跨域时一般都设置该值 为 true
      changeOrigin: true,
      ws: false,
      pathRewrite: {
        "^/token": "/",
      },
    })
  );
};
