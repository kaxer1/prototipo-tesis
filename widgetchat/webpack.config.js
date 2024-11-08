const path = require("path");
module.exports = {
  entry: {
    "chatbot.js": [
      path.resolve(__dirname, "dist/widgetchat/browser/polyfills.js"),
      path.resolve(__dirname, "dist/widgetchat/browser/styles.css"),
      path.resolve(__dirname, "dist/widgetchat/browser/main.js"),
    ],
  },
  output: { filename: "[name]", path: path.resolve(__dirname, "dist/chatbot/") },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    host: '0.0.0.0', // Escuchar en todas las interfaces
    proxy: {
      '/chat-plataforma-api': {
        target: 'http://localhost:8091',
        pathRewrite: { '^/chat-plataforma-api': '/api' },
        secure: false,
        changeOrigin: true,
      }
    },
    allowedHosts: [
      'localhost', // Agrega localhost o cualquier host necesario
    ],
    hot: true,
  },
};