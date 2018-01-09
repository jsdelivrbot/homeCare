<template>
	<div class='view-loginCode'>
		<x-header class="header" :title='$route.name'></x-header>
		<div class="block"></div>
		<group class='common-login-group register-group'>
			<x-input name="tel" type='tel' placeholder="手机号码" v-model='tel' v-validate="'required|isMobile'" :class="{'is-danger': validateError.has('tel')}">
				<spinner type="ios" v-if='telLoading' slot='right'></spinner>
				<img slot="label" src="~assets/images/dl_sj.png">
			</x-input>
			<x-input name='vCode' type='number' placeholder="验证码" v-model='vCode' class="weui-vcode" v-validate="'required|numeric|digits:6'" :class="{'is-danger': validateError.has('vCode')}">
				<img slot="label" src="~assets/images/zc_yzm.png">
				<div slot="right" v-if='vCodeStart' class='common-vCode'>
					<countdown v-model="time" :start="vCodeStart" @on-finish="finish"></countdown>s后重新获取
				</div>
				<a class='get-vCode' v-else slot="right" @click='getPhoneValidateCode'>获取验证码</a>
			</x-input>			
		</group>
		<x-button class='common-login-btn register-btn' @click.native="login" :type="validateError.any()?'default':'primary'" :disabled='validateError.any()'> 登录</x-button>
	</div>
</template>

<script>
	import { XInput, Group, XButton, XHeader, Countdown, Spinner } from 'vux'
	import sha512 from 'js-sha512' //sha512加密
import mixins from 'assets/js/mixins.js'
export default {
		data() {
			return {
				tel: '',
				vCode: '',
				password: '',
				password2: '',
				telLoading: false,
				vCodeStart: false, //验证码按钮开关
				time: 60, //验证码倒计时
				cityList: [], //城市三级联动数据，来自数据库下载来的json文件
				telNoRepeat: false //异步校验手机号码是否重复
			}
		},
		mixins: [mixins.city],
		watch: {
			tel(opt) {
				if(opt.length == 11) {
					this.checkLoginName();
				}
			}
		},
		computed: {
			//判断两次密码是否相同
			isEqually() {
				return this.password == this.password2 ? true : false
			}

		},
		methods: {
			//验证号码是否被注册
			checkLoginName() {
				this.telLoading = true;
				this.telNoRepeat = false;
				this.$validator.validateAll({
					tel: this.tel
				}).then(() => {
					this.$common.ajax({
						loading: false,
						data: {
							header: {
								action: 'CheckMobile',
							},
							body: {
								mobile: this.tel,
							}
						},
						success: (res) => {
							this.telLoading = false;
							this.$vux.toast.show({
								text: '该号码未注册',
								type: 'cancel'
							});
						},
						error: (res) => {
							this.telLoading = false;
							this.telNoRepeat = false;
						}
					})
				}).catch(() => {
					this.telLoading = false;
				});
			},
			//获取验证码
			getPhoneValidateCode() {
				this.$validator.validateAll({
					tel: this.tel
				}).then(() => {
					if(!this.telNoRepeat) {
						this.$common.ajax({
							loadingText: '验证码发送中',
							data: {
								header: {
									action: 'SmsValidateCode',
								},
								body: {
									mobile: this.tel,
								}
							},
							success: (res) => {
								this.vCodeStart = true;
								this.$vux.toast.show({
									text: '验证码已发送至' + this.tel + '，请注意查收',
									width: '50%',
									type: 'text'
								})
							}
						})
					} else {
						this.$vux.toast.show({
							text: '该号码已注册，请直接登录',
							type: 'cancel'
						});
					}
				})
			},
			//验证码倒计时结束
			finish() {
				this.vCodeStart = false;
				this.time = 60;
			},
			//提交表单
			submitData() {
				if(!this.telNoRepeat) {
					if(this.isEqually) {
						this.$common.ajax({
							data: {
								header: {
									action: 'EditPasswordByValidateCode',
								},
								body: {
									mobile: this.tel,
									validatecode: this.vCode,
									newpassword: sha512(this.password)
								}
							},
							success: (res) => {
								this.$vux.toast.show({
									text: res.cause,
									onHide: () => {
										this.$router.push({
											path: '/login'
										});
									}
								})
							}
						})
					} else {
						this.$vux.toast.show({
							text: '两次密码输入不一致',
							type: 'cancel'
						});
					}
				} else {
					this.$vux.toast.show({
						text: '该号码未注册',
						type: 'text'
					});
				}
			},
			//登录
			login() {
				this.$common.login({
					action:'UserLoginByValidateCode',
					loading: true,
					tel: this.tel,
					ValidateCode:this.vCode,
					render: () => {
						this.$router.push({
							path: '/homeRouterView/home'
						});
						if(!localStorage.cityList) {
							this.getCityList();
						}
					}
				})
			},
		},
		mounted() {
			this.$validator.validateAll()
		},
		components: {
			XInput,
			Group,
			XButton,
			XHeader,
			Countdown,
			Spinner
		}
	}
</script>

<style lang="less" scoped>
	.view-loginCode {
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
		.block{
			padding-top: 150px;
		}
		.register-group {			
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