import Vue from 'vue'
import ECharts from 'vue-echarts/components/ECharts.vue'
import theme from '@/assets/js/theme.json'
ECharts.registerTheme('my-theme', theme) //主题
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
// 注册组件后即可使用
Vue.component('Chart', ECharts)

