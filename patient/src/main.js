import Vue from 'vue' //vue框架

import util from 'assets/js/util.js' //全局通用对象
// import FastClick from 'fastclick' //去除300ms点击延迟
// FastClick.attach(document.body)
import ajax from '@/assets/js/ajax.js';
Vue.use(ajax);
import VueScroller from 'vue-scroller' //上拉下拉插件
import '@/assets/js/echarts.conf.js';
import '@/assets/js/veeValidate.conf.js';
import '@/assets/js/vux.conf.js';
import 'font-awesome/css/font-awesome.css'
import 'iview/dist/styles/iview.css';
import router from '@/routes/config.js';
import store from '@/store/index.js' //vuex数据管理

import mixins from "@/assets/js/mixins.js";


import {
  Table,
  Button,
  Tag
} from 'iview';
Vue.component('Table', Table);
Vue.component('Tag', Tag);
Vue.component('Button', Button);

Vue.use(VueScroller)

Vue.config.productionTip = false
Vue.prototype.$common = util;
import App from './App' //app首页
window.homeCareApp = new Vue({
  mixins: [mixins.city],
  router,
  store,
  render: h => h(App)
}).$mount('#app-box');

// if (!localStorage.getItem('token')) {
//   homeCareApp.$router.push('/login')
// }

//微信公众号记录微信openId,每次进入页面或者刷新页面，都自动带openId登录一次，成功到首页，失败到登录页
// 1、带openId微信公众号登录
// 2、带idCard 查看健康数据
localStorage.setItem('openId', homeCareApp.$common.getUrlParams('openId'));
if (homeCareApp.$common.getUrlParams('idCard') == '') {

  homeCareApp.$ajax({
    data: {
      header: {
        action: "UserLogin"
      },
      body: {
        openId: localStorage.openId
      }
    },
    success: res => {
      homeCareApp.$common.setLocalStorage("token", res.tokenid);
      homeCareApp.$common.setLocalStorage("userPic", res.HeaderPhoto);
      homeCareApp.$common.setLocalStorage("user", res);
      if (!localStorage.cityList) {
        homeCareApp.getCityList();
      }
      //路由noRequiresAuth如果是true，就不跳转到首页。
      if (homeCareApp.$router.currentRoute.meta.noRequiresAuth) {
        return false;
      }
      homeCareApp.$router.push({
        path: "/homeRouterView/home"
      });
    }
  });

}
//在路由为空的时候点击头部左侧返回按钮，返回到首页。
// setTimeout(() => {
//   document.querySelector('.left-arrow').onclick = function () {
//     if (sessionStorage.count == 1) {
//       homeCareApp.$router.push({
//         path: "/homeRouterView/home"
//       });
//     } else {
//       homeCareApp.$router.go(-1);
//     }
//   }
// }, 1500)
