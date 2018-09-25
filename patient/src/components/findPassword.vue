<template>
	<div class='view-findPassword'>
		<x-header class="header"
		    :title='$route.name'></x-header>
		<div class="title">
			请输入找回密码信息
		</div>
		<group class='common-login-group register-group'>
			<x-input name="tel"
			    type='tel'
			    placeholder="手机号码"
			    v-model='tel'
			    v-validate="'required|isMobile'"
			    :class="{'is-danger': validateError.has('tel')}">
				<spinner type="ios"
				    v-if='telLoading'
				    slot='right'></spinner>
				<img slot="label"
				    src="~assets/images/dl_sj.png">
			</x-input>
			<x-input name='vCode'
			    type='number'
			    placeholder="验证码"
			    v-model='vCode'
			    class="weui-vcode"
			    v-validate="'required|numeric|digits:6'"
			    :class="{'is-danger': validateError.has('vCode')}">
				<img slot="label"
				    src="~assets/images/zc_yzm.png">
				<div slot="right"
				    v-if='vCodeStart'
				    class='common-vCode'>
					<countdown v-model="time"
					    :start="vCodeStart"
					    @on-finish="finish"></countdown>s后重新获取
				</div>
				<a class='get-vCode'
				    v-else
				    slot="right"
				    @click='getPhoneValidateCode'>获取验证码</a>
			</x-input>
			<x-input name="password"
			    :type='passwordType'
			    placeholder="密码（6-14位数字/字母/下划线）"
			    v-model='password'
			    v-validate="'required|min:6|max:14|noSpecial'"
			    :class="{'is-danger': validateError.has('password')}">
				<img slot="label"
				    src="~assets/images/dl_mm.png">
				<span slot="right"
				    @click="passwordTypeChange">
					<img v-if="passwordType === 'password'"
					    src="../assets/images/zy.png" />
					<img v-else
					    src="../assets/images/by.png" />
				</span>
			</x-input>
			<x-input name="password2"
			    :type='passwordType2'
			    placeholder="重复密码"
			    v-model='password2'
			    v-validate="'required|min:6|max:14|noSpecial'"
			    :class="{'is-danger': validateError.has('password2')}">
				<img slot="label"
				    src="~assets/images/dl_mm.png">
				<span slot="right"
				    @click="passwordTypeChange2">
					<img v-if="passwordType2 === 'password'"
					    src="../assets/images/zy.png" />
					<img v-else
					    src="../assets/images/by.png" />
				</span>
			</x-input>
		</group>
		<x-button class='common-login-btn register-btn'
		    @click.native="submitData"
		    :type="validateError.any()?'default':'primary'"
		    :disabled='validateError.any()'> 重置密码</x-button>
	</div>
</template>

<script>
import sha512 from "js-sha512"; //sha512加密
export default {
  data() {
    return {
      passwordType: "password",
      passwordType2: "password",
      tel: "",
      vCode: "",
      password: "",
      password2: "",
      telLoading: false,
      vCodeStart: false, //验证码按钮开关
      time: 60, //验证码倒计时
      telNoRepeat: false //异步校验手机号码是否重复
    };
  },
  watch: {
    tel(opt) {
      if (opt.length == 11) {
        this.checkLoginName();
      }
    }
  },
  computed: {
    //判断两次密码是否相同
    isEqually() {
      return this.password == this.password2 ? true : false;
    }
  },
  methods: {
    passwordTypeChange() {
      this.passwordType =
        this.passwordType === "password" ? "text" : "password";
    },
    passwordTypeChange2() {
      this.passwordType2 =
        this.passwordType2 === "password" ? "text" : "password";
    },
    //验证号码是否被注册
    checkLoginName() {
      this.telLoading = true;
      this.telNoRepeat = false;
      this.$validator
        .validateAll({
          tel: this.tel
        })
        .then(() => {
          this.$ajax({
            data: {
              header: {
                action: "CheckMobile"
              },
              body: {
                mobile: this.tel
              }
            },
            success: res => {
              this.telLoading = false;
              this.$vux.toast.show({
                text: "该号码未注册",
                type: "cancel"
              });
            },
            error: res => {
              this.telLoading = false;
              this.telNoRepeat = false;
            }
          });
        })
        .catch(() => {
          this.telLoading = false;
        });
    },
    //获取验证码
    getPhoneValidateCode() {
      this.$validator
        .validateAll({
          tel: this.tel
        })
        .then(() => {
          if (!this.telNoRepeat) {
            this.$vux.loading.show({
              text: "验证码发送中"
            });
            this.$ajax({
              data: {
                header: {
                  action: "SmsValidateCode"
                },
                body: {
                  mobile: this.tel
                }
              },
              success: res => {
                this.vCodeStart = true;
                this.$vux.toast.show({
                  text: "验证码已发送至" + this.tel + "，请注意查收",
                  width: "50%",
                  type: "text"
                });
              }
            });
          } else {
            this.$vux.toast.show({
              text: "该号码已注册，请直接登录",
              type: "cancel"
            });
          }
        });
    },
    //验证码倒计时结束
    finish() {
      this.vCodeStart = false;
      this.time = 60;
    },
    //提交表单
    submitData() {
      if (!this.telNoRepeat) {
        if (this.isEqually) {
          this.$vux.loading.show({
            text: "加载中"
          });
          this.$ajax({
            data: {
              header: {
                action: "EditPasswordByValidateCode"
              },
              body: {
                mobile: this.tel,
                validatecode: this.vCode,
                newpassword: sha512(this.password)
              }
            },
            success: res => {
              this.$vux.toast.show({
                text: res.cause,
                onHide: () => {
                  this.$router.push({
                    path: "/login"
                  });
                }
              });
            }
          });
        } else {
          this.$vux.toast.show({
            text: "两次密码输入不一致",
            type: "cancel"
          });
        }
      } else {
        this.$vux.toast.show({
          text: "该号码未注册",
          type: "text"
        });
      }
    }
  },
  mounted() {
    this.$validator.validateAll();
  }
};
</script>

<style lang="less" scoped>
.view-findPassword {
  height: 100%;
  background: #fff;
  .title {
    background: #fff;
    padding-top: 200px;
    margin-bottom: 50px;
    text-align: center;
    font-size: 52px;
    color: #3d3d3d;
  }
  .register-group {
    margin-top: 0px;
    margin-bottom: 165px;
  }
  .register-btn {
    margin-bottom: 80px;
  }
  .register-clause {
    font-size: 36px;
    text-align: center;
    color: #bebebe;
    a {
      color: @primary-color;
    }
  }
}
</style>