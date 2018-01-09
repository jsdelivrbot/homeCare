<template>
	<div class='view-user-center'>		
		<div class='content common-padding'>
			<div class="common-user-details">			
			<div class="left">
				<router-link :to="{path:'/homeRouterView/contractDoctorEveluate',query:{id:details.ID,details:JSON.stringify(details)}}">
				<img src="~assets/images/common-chat.png" />
				<p>评价详情</p>
				</router-link>
			</div>
			<div class="center">
				<router-link :to="{path:'/userCenterRouterView/editPersonalData'}">
				<div class="img">
					<img :src="details.HeaderPhoto" />
				</div>
				<h1>{{details.RealName}}</h1>
				<p class='doctor-department'>{{details.DepartName}} | {{details.ClinicalTitle}}</p>
				</router-link>
			</div>
			<!--<div class="right active">
				<router-link :to="{path:'/404'}">
					<img src="~assets/images/edit.png" />
					<p>健康咨询</p>
				</router-link>
				
			</div>-->
		</div>			
			<group class="common-menu-list">
				<cell title="个人信息" is-link :link="{path:'/userCenterRouterView/editPersonalData'}">
					<img src="~assets/images/contract-doctor-qyhz.png" slot='icon' />
				</cell>
				<!--<cell title="就诊记录" is-link :link="{path:'/userCenterRouterView/visit'}">
					<img src="~assets/images/wd_icon_xxtx.png" slot='icon' />
				</cell>-->
				<!--<cell title="实名认证" is-link :link="{path:'/userCenterRouterView/realName',query:{state:details.RealState}}">
					<img src="~assets/images/wd_icon_smrz.png" slot='icon' />
				</cell>-->
				<!--<cell title="消息提醒" is-link link='/404'>
					<img src="~assets/images/wd_icon_xxtx.png" slot='icon' />
				</cell>-->
				<cell title="意见反馈" is-link link='/userCenterRouterView/feedback'>
					<img src="~assets/images/wd_icon_yjfk.png" slot='icon' />
				</cell>
				<!--<cell title="修改密码" is-link link='/userCenterRouterView/editPassword'>
					<img src="~assets/images/wd_icon_xgmm.png" slot='icon' />
				</cell>-->
				<!--<cell title="检查更新" is-link link='/404'>
					<img src="~assets/images/wd_icon_jcgx.png" slot='icon' />
				</cell>-->
			</group>
			<x-button class='common-login-btn' @click.native="logout" type="warn">解除绑定</x-button>
		</div>
		<xh-foot></xh-foot>
	</div>
</template>

<script>
	import { XHeader, Group, Cell, XButton, Spinner } from 'vux'
	import xhFoot from 'components/footer';
	export default {
		data() {
			return {
				eqiupBind: [], //设备绑定列表
				details: {}, //用户信息
				follow: {
					loading: true,
					count: ''
				},
				guardian: {
					loading: true,
					count: ''
				}
			}
		},
		computed: {
			//绑定状态
			eqiupState() {
				return this.eqiupBind.length > 0 ? true : false
			}
		},
		methods: {			
			//获取个人资料
			getData() {
				this.$common.ajax({
					loading: false,
					result: true,
					data: {
						header: {
							action: 'GetDoctorInfo',
						},
						body: {
							DoctorID: this.$common.getLocalStorage('user').doctorid
						}
					},
					success: (res) => {
						this.details = res;
						this.$common.setLocalStorage('realState', this.details.RealState);
					}
				})
			},			
			//解除绑定
			logout() {
				this.$vux.confirm.show({
					title: '提示',
					content: '确认解除绑定？',
					onConfirm: () => {
						this.$common.ajax({
							loadingText: '解除中',
							data: {
								header: {
									action: 'WxUnbind',
								},
								body: {
									usertype:0,
									openid: localStorage.openId
								}
							},
							success: (res) => {	
								this.$common.clearLocalStorage();
								this.$router.push({
									path: '/login'
								});
							}
						})
					}
				})
			}
		},
		mounted() {
			this.getData();		
		},

		components: {
			Group,
			Cell,
			xhFoot,
			XHeader,
			XButton,
			Spinner
		}
	}
</script>

<style lang="less">
	.view-user-center {
		height: 90%;
		.content {
			padding-bottom: 130px;
		}
		.details-box {
			background: #f0f5fb;
			height: 535px;
			padding: 20px 0px;
			border-bottom: 1px solid @gray;
			.item {
				margin-left: 100px;
				width: 200px;
				text-align: center;
				float: left;
				.img {
					width: 290px;
					height: 290px;
					margin: 0 auto;
					border-radius: 100%;
					border: 8px solid #fff;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
				}
				h1 {
					height: 90px;
					position: relative;
					font-size: 60px;
					color: #1abd24;
					.vux-spinner {
						margin-top: 4px;
					}
				}
				p {
					margin-top: 25px;
					font-size: 42px;
					color: #808080;
				}
				&.item-img {
					margin-top: 20px;
					width: 290px;
					h1 {
						font-size: 48px;
						color: #333;
					}
					p {
						font-size: 48px;
					}
				}
				&.item-right,
				&.item-left {
					margin-top: 180px;
				}
				&.item-right {
					h1 {
						color: #eb632e;
					}
				}
			}
		}
		.common-user-details {
			.left{
				img{
					background: #2fc240;
				}
			}
			.right{
				img{
					background: #ffcc33!important;
				}
			}
			
		}
		.common-menu-list{
			margin-top: 370px;
		}
		.instrument {
			position: relative;
			.left-nav {
				position: absolute;
				top: -20px;
				left: 40px;
				width: 70px;
				i {
					width: 70px;
					height: 70px;
					display: inline-block;
					background: url(~assets/images/wd_icon_tcdl.png) no-repeat center;
					background-size: contain;
					&.jcgx {
						background: url(~assets/images/wd_icon_jcgx.png) no-repeat center;
						background-size: contain;
					}
				}
			}
			.instrument-box {
				text-align: center;
				font-size: 42px;
				color: #fff;
				padding: 20px 40px;
				width: 550px;
				margin: 0 auto;
				margin-top: 350px;
				margin-bottom: 60px;
				border-radius: 100px;
				background: #787878;
				i {
					display: inline-block;
					width: 70px;
					height: 70px;
					vertical-align: -7px;
					margin-right: 10px;
					background: url(~assets/images/user-center-apparatus.png) no-repeat center;
					background-size: contain;
				}
				&.active {
					background: @primary-color;
				}
			}
		}
		.common-login-btn {
			width: 1010px;
			margin-top: 40px;
			margin-bottom: 40px;
		}
	}
</style>