
// const port = 6668; // dev port
let styleVariables = require('./src/style/variables.scss.js');
const port = 9527 // dev port

module.exports = {
  /* crossorigin: 'anonymous', // htmlWebpackPlugin
  devServer: {
    hot: true,
    open: true, // 自动调用默认浏览器打开
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
  }, */
  devServer:{
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      "/api": {
        // target: `http://127.0.0.1:${port}/mock`,
        target: 'http://118.190.204.202:9002',
        // target: 'https://corp-support.cn',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": ''
        }
      },
      "/load/upload": {
        // target: 'http://118.190.204.202:8010',
        target: 'http://118.190.204.202:9003',
        // target: 'https://corp-support.cn',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/load": ''
        }
      }
    }
    // after: require('./mock/mock-server.js')
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: Object.keys(styleVariables)
          .map(k => `\$${k.replace('_', '-')}: ${styleVariables[k]};`)
          .join('\n')
      }
    }
  }
};
