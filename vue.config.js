const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  publicPath: process.env.NODE_ENV === 'production'
      ? '/crm-buh/'
      : '/',

  devServer: {
    proxy: 'http://localhost:5000'
  }
})
