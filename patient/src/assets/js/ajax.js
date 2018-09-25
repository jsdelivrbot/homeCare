import axios from 'axios';
export default {
  install(Vue, options) {
    var ajaxOption = {
      baseURL: 'http://api.homecare.sdsesxh.com', //'http://api.homecare.xuhuicn.com',
      method: 'post',
      url: '',
      data: {}, //请求参数
      params: {}, //跟在url后面的参数	
      timeout: 5000, //请求超时（毫秒） 			
    };
    Vue.prototype.$ajax = function (opts) {
      opts.data.header.version = '1.0';
      opts.data.header.token = localStorage.getItem('token') || '';
      let option = Object.assign({}, ajaxOption, opts);
    
      return axios(option).then(response => {
        let res = response.data;
        if (res.header.status == 0) {
          this.$vux.loading.hide();
          //第一个参数是返回的数据，第二个参数是分页的数据。
          option.success(res.body,res.footer);
        } else {
          this.$vux.loading.hide();
          //首次进入页面自动登录默认openId还没绑定，接口会调用失败，做个判断不显示失败提示。
          if(option.data.header.action=='UserLogin'&&!option.data.body.mobile){           
            return false;
          }
          this.$vux.toast.show({
            text: res.header.failures.message,
            type: 'warn',
          });
          option.error&&option.error(res.body);
        }
      }).catch(res => {
        this.$vux.loading.hide();
        if (res.code == "ECONNABORTED") {
          this.$vux.toast.show({
            text: '请求超时!',
            type: 'warn',
          });
          return false;
        }
        if (res.message == 'Network Error') {
          this.$vux.toast.show({
            text: '网络连接错误!',
            type: 'warn',
          });
          return false;
        }
        this.$vux.toast.show({
          text: `服务器接口出错,状态码:${res.response.status}`,
          type: 'warn',
        });
      });
    };
  }
};
