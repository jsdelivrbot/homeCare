var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var pxtorem = require('postcss-pxtorem')
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction ?
      config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    }),
    pxtorem({
      rootValue: 108,
      // selectorBlackList: [/^.vux-/,/^.weui-/], 
      // propWhiteList: ['*','!font*'],
      selectorBlackList: ['weui-switch','vux-tab-wrap', 'vux-tab-container', 'vux-tab', 'vux-tab-item', 'vux-button-group', 'vux-button-group', 'weui-grid', 'vux-popup-header', 'vux-popup-header-left', 'vux-popup-header-right', 'dp-header', 'vux-datetime-cancel', 'dp-item', 'weui-dialog', 'weui-dialog__hd', 'weui-dialog__title', 'weui-dialog__bd', 'weui-dialog__ft', 'weui-dialog__btn', 'weui-toast', 'weui-loading', 'weui-toast__content', 'weui-icon_toast', 'weui-toast'], //,'vux','weui','dp-item'
      propWhiteList: ['width', 'height', 'padding*', 'margin*', 'font-size', 'top', 'bottom', 'left', 'right', 'border*', 'line*', 'background*', 'scroller*', 'min-height',],
    })
  ]
}
