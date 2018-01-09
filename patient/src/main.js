import Vue from 'vue' //vue框架
import Vuex from 'vuex' //vuex数据状态管理
import storeOption from './store' //vuex数据管理
import VueRouter from 'vue-router' //路由
import routes from './routes' //路由配置
import App from './App' //app首页
import util from 'assets/js/util.js' //全局通用对象
import FastClick from 'fastclick' //去除300ms点击延迟
import ECharts from 'vue-echarts' //echart图表
import { ToastPlugin, LoadingPlugin, ConfirmPlugin, DatetimePlugin, AlertPlugin ,WechatPlugin} from 'vux' //vux移动UI库
import VueScroller from 'vue-scroller' //上拉下拉插件
import _ from 'lodash' //lodash函数处理库
import VeeValidate, {
	Validator
} from 'vee-validate'; //表单验证
import veeValidateRule from 'assets/js/veeValidateRule.js' //VeeValidate自定义规则
import zh_CN from 'vee-validate/dist/locale/zh_CN'; //VeeValidate中文包
Validator.addLocale(zh_CN);
Object.keys(veeValidateRule).forEach((t, i) => { //注册自定义验证规则
	Validator.extend(t, veeValidateRule[t]);
})
Validator.updateDictionary({ //修改默认验证规则
	'zh_CN': {
		messages: {
			required: (aa) => '请填写完整'
		},
		numeric: {
			required: () => '必须是数字'
		}
	}
});
Vue.use(VeeValidate, {
	errorBagName: 'validateError',
	fieldsBagName: 'validateFields',
	locale: 'zh_CN'
});

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueScroller)
Vue.component('chart', ECharts)
Vue.use(ToastPlugin)
Vue.use(DatetimePlugin)
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(WechatPlugin)
//Vue.use(_)
FastClick.attach(document.body)
Vue.config.productionTip = false
//Vue.config.errorHandler = function(err, vm) {
//	console.log(err, vm)
//}
// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store(storeOption);
// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
	//mode: 'history',
	routes: routes,
	hashbang: true
});


Vue.prototype.$common = util;
window.homeCareApp = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app-box');
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
router.beforeEach((to, from, next) => {
	homeCareApp.$vux.loading.hide();
	document.body.scrollTop = 0;
	if(to.matched.some(record => record.meta.noRequiresAuth)) {
		next()
	} else {
		if(!localStorage.getItem('token')) {
			next({
				path: '/login'
			})
		} else {
			next()
		}
	}
	//路由来回动画切换
	const toIndex = history.getItem(to.path)
	const fromIndex = history.getItem(from.path)
	if(toIndex) {
		if(!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
			 store.commit('updateDirection', {direction: 'forward'})
		} else {
			 store.commit('updateDirection', {direction: 'reverse'})
		}
	} else {
		++historyCount
		history.setItem('count', historyCount)
		to.path !== '/' && history.setItem(to.path, historyCount)
		store.commit('updateDirection', {direction: 'forward'})
	}
	if(/\/http/.test(to.path)) {
		let url = to.path.split('http')[1]
		window.location.href = `http${url}`
	} else {
		next()
	}
})
router.afterEach(function(to) {
//	setTimeout(() => {
//		
//		if(document.querySelector('.common-header-left')) {
//			document.querySelector('.common-header-left').classList.add('active')
//		}
//		if(document.querySelector('.common-header-right')) {
//			document.querySelector('.common-header-right').classList.add('active')
//		}
//	}, 500)

})
if(!localStorage.getItem('token')) {
	homeCareApp.$router.push('/login')
}

//微信公众号记录微信openId,每次进入页面或者刷新页面，都自动带openId登录一次，成功到首页，失败到登录页
localStorage.setItem('openId', location.search.split('&')[0].split('=')[1])
homeCareApp.$common.login({
	loading:false,
	noMessage:true,//判断刷新或者第一次进入不弹出提示
	render: () => {
		if(!homeCareApp.$router.currentRoute.meta.messageLink){
			homeCareApp.$router.push('/homeRouterView/home')
		}
	}
})