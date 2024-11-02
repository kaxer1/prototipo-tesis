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
    proxy: {
      context: ['/chat-platarma-api'],
      target: 'http://127.0.0.1:8091',
      pathRewrite: { '^/chat-platarma-api': '/api' },
      secure: false,
      changeOrigin: false
    },
  },
};