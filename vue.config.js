const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // vue项目中Uncaught runtime errors:怎样关闭
  	devServer: {
      client: {
        overlay: false
      }
    }
})
