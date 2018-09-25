import Vue from 'vue' //vue框架
import VueRouter from 'vue-router' //路由
import routes from '@/routes/index.js' //路由配置
import store from '@/store/index.js' //vuex数据管理
Vue.use(VueRouter)
var homeCareApp=new Vue()

// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
	//mode: 'history',
	routes: routes,
	hashbang: true
});

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach((to, from, next) => {
	// homeCareApp.$vux.loading.hide();
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
	window.scrollTo(0,0);
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

export default router