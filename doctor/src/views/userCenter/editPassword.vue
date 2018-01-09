<template>
	<div class='view-edit-password  common-padding'>
		<div class="title">
			请输入密码修改信息
		</div>
		<group class='common-login-group edit-password-group'>
			<x-input name="oldPassword" type='password' placeholder="请输入旧密码" v-model='oldPassword' v-validate="'required'" :class="{'is-danger': validateError.has('oldPassword')}">
				<img slot="label" src="~assets/images/dl_mm.png">
			</x-input>
			<x-input name="password" :type='passwordType' placeholder="密码（6-14位数字/字母/下划线）" v-model='password' v-validate="'required|min:6|max:14|noSpecial'" :class="{'is-danger': validateError.has('password')}">
				<img slot="label" src="~assets/images/dl_mm.png">
				<span slot="right" @click="passwordTypeChange">
					 	<img v-if="passwordType === 'password'" src="~assets/images/zy.png"/>
					  	<img v-else src="~assets/images/by.png"/>
					</span>
			</x-input>
			<x-input name="password2" :type='passwordType2' placeholder="重复密码" v-model='password2' v-validate="'required|min:6|max:14|noSpecial'" :class="{'is-danger': validateError.has('password2')}">
				<img slot="label" src="~assets/images/dl_mm.png">
				<span slot="right" @click="passwordTypeChange2">
					 	<img v-if="passwordType2 === 'password'" src="~assets/images/zy.png"/>
					  	<img v-else src="~assets/images/by.png"/>
					</span>
			</x-input>
		</group>
		<x-button class='common-login-btn register-btn' text='提交' @click.native="editPassword" :type="validateError.any()?'default':'primary'" :disabled='validateError.any()'></x-button>
	</div>
</template>

<script>
	import { XInput, Group, XButton, XHeader } from 'vux';
	import sha512 from 'js-sha512' //sha512加密
	export default {
		data() {
			return {
				passwordType: 'password',
				passwordType2: 'password',
				oldPassword: "",
				password: '',
				password2: ''
			}
		},
		computed: {
			//判断是否与旧密码相同
			likeOldPassword() {
				return this.oldPassword == this.password ? true : false
			},
			//判断两次密码是否相同
			isEqually() {
				return this.password == this.password2 ? true : false
			}
		},
		methods: {
			passwordTypeChange() {
				this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
			},
			passwordTypeChange2() {
				this.passwordType2 = this.passwordType2 === 'password' ? 'text' : 'password'
			},
			//提交表单
			editPassword() {
				if(!this.likeOldPassword) {
					if(this.isEqually) {
						this.$vux.confirm.show({
							title: '提示',
							content: '确认修改？',
							onConfirm: () => {
								this.$common.ajax({
									data: {
										header: {
											action: 'EditDoctorPassword',
										},
										body: {
											doctorid: this.$common.getLocalStorage('user').doctorid,
											oldpassword: sha512(this.oldPassword),
											newpassword: sha512(this.password)
										}
									},
									success: (res) => {
										this.$vux.toast.show({
											text: '修改成功',
											onHide: () => {
												this.$router.go(-1);
											}
										});
									}
								})
							}
						})
					} else {
						this.$vux.toast.show({
							text: '两次密码输入不一致',
							type: 'text'
						});
					}
				} else {
					this.$vux.toast.show({
						text: '新密码不能与旧密码相同',
						type: 'text'
					});
				}
			}
		},
		mounted() {
			this.$validator.validateAll()
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
	.view-edit-password {
		.edit-password-group {
			margin-top: 30px;
			margin-bottom: 80px;
		}
		.title {
			margin-top: 90px;
			font-size: 42px;
			text-align: center;
		}
	}
</style>