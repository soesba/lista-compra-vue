const { defineConfig } = require("@vue/cli-service");
const webpack = require('webpack');

module.exports = defineConfig({  
  publicPath: './',
  transpileDependencies: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  chainWebpack: config =>
    config
      .plugin('feature-flags')
      .use(require('webpack').DefinePlugin, [{
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  }])
})
