<template>
	<div class='view-family-details common-padding'>
		<div class="common-user-details">
			<!--<div class="left active">
				<router-link :to="{path: '/404'}">
					<img src="~assets/images/common-see.png" />
					<p>健康互动</p>
				</router-link>
			</div>-->
			<div class="center">
				<div class="img">
					<img :src="details.HeaderPhoto" />
				</div>
				<h1>{{details.RealName}}<i class='active'></i></h1>
				<p>{{$common.sexType[details.Sex]}}&nbsp;&nbsp;&nbsp;&nbsp;<!--52岁--></p>
			</div>
			<div class="right active" @click='show=true'>
				<!--<router-link :to="{path:'/homeRouterView/healthData',query:{userId:details.ID}}">-->
				<img src="~assets/images/common-chat.png" />
				<p>健康数据</p>
				<!--</router-link>-->
			</div>
		</div>
		<div class="content">
			<div class="list">
				<ul>
					<li class="tel">
						<p><i></i>联系电话</p>
						<span>{{details.Mobile}}</span>
					</li>
					<li class="address">
						<p><i></i>居住地址</p>
						<span>{{details.Address}}</span>
					</li>
					<li class="remarks">
						<p><i></i>备注</p>

						<div class="textarea">
							<x-textarea v-model='details.Remark' autosize readonly></x-textarea>
						</div>
					</li>
					<li class="medical">
						<p><i></i>过往病史</p>

						<div class="textarea">
							<x-textarea v-model='details.MedicalHistory' autosize readonly></x-textarea>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<actionsheet v-model="show" :menus="menus" @on-click-menu="routeChange"></actionsheet>
	</div>
</template>

<script>
	import { XHeader, Confirm, XTextarea, Actionsheet, PopupRadio } from 'vux'
	import mixins from 'assets/js/mixins.js'
	export default {
		name: 'familyMemberDetails',
		mixins: [mixins.addConcernApply],
		data() {
			return {
				show: false,				
				menus: [{
					label: '健康数据',
					value: '/homeRouterView/healthData',
				}, {
					label: '健康规则',
					value: '/homeRouterView/healthRule',
				},{
					label: '添加健康建议',
					value: '/homeRouterView/healthInterventionProgramAdd',
				}]
			}
		},
		computed: {
			//类型
			type() {
				return this.$route.query.type
			}
		},
		methods: {
			routeChange(path) {
				let query={
					userId: this.details.ID
				}
				if(path=='/homeRouterView/healthInterventionProgramAdd'){
					query.details=JSON.stringify(this.details)
				}
				this.$router.push({
					path: path,
					query: query
				})
			},
			//关注取消关注切换
			submitSelect() {
				this.type == '0' ? this.deteleData() : this.confirm = true
			},
			deteleData() {
				this.$vux.confirm.show({
					title: '提示',
					content: '确认删除关注？',
					onConfirm: () => {
						this.$common.ajax({
							data: {
								header: {
									action: 'DeleteConcern',
								},
								body: {
									ConcernID: '',
									DeleteUserID: this.$route.query.id
								}
							},
							success: (res) => {
								this.$vux.toast.show({
									text: '取消关注成功',
									type: 'success',
									onHide: () => {
										this.$router.push({
											path: '/homeRouterView/familyMember'
										})
									}
								})
							}
						})
					}
				});
			},
			getData() {
				this.$common.ajax({
					result: true,
					data: {
						header: {
							action: 'GetUserInfo',
						},
						body: {
							userid: this.$route.query.id
						}
					},
					success: (res) => {
						this.details = res;
					}
				})
			},
		},
		mounted() {
			this.getData();
		},

		components: {
			XHeader,
			Confirm,
			XTextarea,
			Actionsheet
		}
	}
</script>

<style lang="less">
	.view-family-details {
		height: 100%!important;
		.content {
			margin-top: 350px;
			.wrap {
				border-top: 1px solid @gray;
				padding: 60px 0px;
				ul {
					font-size: 0px;
					li {
						text-align: center;
						display: inline-block;
						border-right: 1px solid @gray;
						width: 33.09%;
						img {
							width: 120px;
							height: 120px;
							margin-bottom: 20px;
						}
						p {
							font-size: 42px;
						}
						&:last-child {
							border: none
						}
					}
				}
			}
			.list {
				ul {
					border-top: 1px solid @gray;
					li {
						width: 100%;
						position: relative;
						border-bottom: 1px solid @gray;
						font-size: 42px;
						padding-bottom: 30px;
						padding-top: 30px;
						&:last-child {
							border: none;
						}
						p {
							i {
								width: 80px;
								height: 80px;
								display: inline-block;
								vertical-align: -7px;
								margin: 0 20px;
								margin-left: 40px;
							}
						}
						span {
							width: 680px;
							height: 65px;
							overflow: hidden;
							text-align: right;
							position: absolute;
							right: 40px;
							top: 40px;
						}
						&.tel {
							i {
								background: url(~assets/images/common-phone.png) no-repeat center;
								background-size: contain;
							}
						}
						&.address {
							i {
								background: url(~assets/images/common-address.png) no-repeat center;
								background-size: contain;
							}
						}
						&.remarks {
							i {
								background: url(~assets/images/user-bz.png) no-repeat center;
								background-size: contain;
							}
						}
						&.medical {
							i {
								background: url(~assets/images/user-gwbs.png) no-repeat center;
								background-size: contain;
							}
						}
						.textarea {
							width: 920px;
							margin: 0 auto;
							border: 1px solid #c4c4c4;
							margin-top: 20px;
							border-radius: 15px;
							padding: 20px;
							background: #f3f1f4;
							textarea {
								background: #f3f1f4;
								font-size: 42px;
							}
						}
					}
				}
			}
		}
	}
</style>