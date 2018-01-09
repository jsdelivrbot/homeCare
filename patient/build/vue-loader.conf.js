var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
var pxtorem = require('postcss-pxtorem')
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    }),
    pxtorem({
					rootValue: 108,
					selectorBlackList:[/no-pxtorem$/],//,'vux','weui','dp-item'
					propWhiteList: ['width','height','padding*','margin*','font-size','top','bottom','left','right','border*','line*','background*','scroller*','min-height'],
				})
  ]
}
