<template>
	<div class='view-login'>
		<div class="bg-box">
			<div class="logo">
				<img src="../assets/images/ic_launcher.png" />
				<p>居家护理</p>
			</div>
			<div class="bottom"></div>
		</div>
		<div class="form-box">
			<group class='common-login-group'>
				<x-input name="tel" type='tel' placeholder="手机号码" v-model='tel' v-validate="'required|isMobile'" :class="{'is-danger': validateError.has('tel')}">
					<img slot="label" src="../assets/images/dl_sj.png">
				</x-input>
				<x-input name="password" :type='passwordType' placeholder="密码" v-model='password' v-validate="'required|min:6|max:14'" :class="{'is-danger': validateError.has('password')}">
					<img slot="label" src="../assets/images/dl_mm.png">
					<span slot="right" @click="passwordTypeChange">
					 	<img v-if="passwordType === 'password'" src="../assets/images/zy.png"/>
					  	<img v-else src="../assets/images/by.png"/>
					</span>
				</x-input>
			</group>
			<x-button class='common-login-btn' @click.native="login" :type="validateError.any()?'default':'primary'" :disabled='validateError.any()'> 登录</x-button>
			<div class="btn-box">
				<router-link :to="{path:'/findPassword'}">忘记密码？</router-link>
				<router-link class='register' :to="{path:'/register'}">快速注册</router-link>
			</div>
			<div class="bottom-btn">
				<router-link :to="{path:'/loginCode'}">验证码登录</router-link>
			</div>
		</div>

	</div>
</template>
<script>
	import { XInput, Group, XButton, XHeader } from 'vux'
	import sha512 from 'js-sha512' //sha512加密
	import mixins from 'assets/js/mixins.js'
	export default {
		name: 'login',
		mixins: [mixins.city],
		data() {
			return {
				passwordType: 'password',
				tel: '',
				password: '',
				cityList: [] //城市三级联动数据，来自数据库下载来的json文件
			}
		},
		computed: {
			btnType() {
				return this.$validator.errorBag.any() ? 'default' : 'primary'
			}
		},
		methods: {
			passwordTypeChange() {
				this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
			},
			//登录
			login() {
				this.$common.login({
					loading: true,
					tel: this.tel,
					password: sha512(this.password),
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
			if(localStorage.getItem('token')) {
				this.$router.push({
					path: '/homeRouterView/home'
				});
			} else {
				this.$router.push({
					path: '/login'
				});
			}

		},
		components: {
			XInput,
			Group,
			XButton,
			XHeader
		}
	}
</script>
<style lang="less" scoped>
	.eye {
		position: absolute;
		right: 0;
		top: 5px;
	}
	
	#app-box {
		background: #fff;
	}
	
	.view-login {
		height: 107%;
		/*调高7% 处理安卓机上下方留白问题*/
		background: #fff;
		.bg-box {
			font-size: 55px;
			position: relative;
			height: 954px;
			background-color: @primary-color;
			.logo {
				position: absolute;
				left: 50%;
				text-align: center;
				margin-left: -100px;
				top: 140px;
				img {
					width: 200px;
					height: 200px;
				}
				p {
					color: #fff;
					font-size: 60px;
				}
			}
			.bottom {
				background: url(~assets/images/ic_login_circle_bg.png) no-repeat;
				background-position: bottom;
				background-size: contain;
				height: 85px;
				position: absolute;
				bottom: -85px;
				left: 0px;
				width: 100%;
			}
		}
		.form-box {
			position: absolute;
			top: 565px;
			width: 965px;
			height: 690px;
			background: #fff;
			box-shadow: 0px 1px 10px 2px rgba(33, 150, 243, 0.12);
			left: 50%;
			margin-left: calc(-965px/2);
			border-radius: 30px;
		}
		.btn-box {
			padding-top: 150px;
			/*position: absolute;
			top: 1300px;*/
			width: 100%;
			text-align: center;
			font-size: 42px;
			.register {
				border-left: 1px solid #000;
				margin-left: 30px;
				padding-left: 30px;
				color: #ffa00a
			}
		}
		.bottom-btn {
			padding-top: 230px;
			text-align: center;
			/*position: absolute;
			bottom:50px;*/
			/*left:50%;
			margin-left:-100px;*/
			a {
				color: @primary-color;
				font-size: 42px;
			}
		}
	}
</style>