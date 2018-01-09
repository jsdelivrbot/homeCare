<template>
	<div class='view-doctor-details common-padding'>
		<div class="common-header-right">
			<a v-if='!$route.query.userId' @click='confirm=true'>{{isSign?'解除签约':'签约'}}</a>
		</div>
		<div class="common-user-details">
			<rater v-model="details.ServiceStar" active-color="#FF9900" :margin="4" disabled></rater>
			<!--<div class="left" :class='{active:isSign}'>
				<router-link :to="{path: '/404'}">
					<img src="~assets/images/contract-doctor-spzl.png" />
					<p>视频诊疗</p>
				</router-link>
			</div>-->
			<div class="center">
				<div class="img">
					<img :src="details.HeaderPhoto" />
				</div>
				<h1>{{details.RealName}}</h1>
				<p class='doctor-department'>{{details.DepartName}} | {{details.ClinicalTitle}}</p>
			</div>
			<!--<div class="right active">
				<router-link :to="{path: '/404'}">
					<img src="~assets/images/common-chat.png" />
					<p>健康咨询</p>
				</router-link>
				
			</div>-->
		</div>
		<div class="instrument">
			<router-link :to="{path: '/homeRouterView/contractDoctorAppointment',query:{id:details.ID,details:JSON.stringify(details)}}">
				<div class="instrument-box active">
					<i></i> 预约挂号
				</div>
			</router-link>
		</div>
		<group class="common-menu-list">
			<cell title="联系电话" :value='details.Mobile'>
				<img src="~assets/images/common-phone.png" slot='icon' />
			</cell>
			<cell title="执业点" :value='details.AgencyName'>
				<img src="~assets/images/contract-doctor-zyd.png" slot='icon' />
			</cell>
			<cell title="签约患者数" :value='details.SignUserCount'>
				<img src="~assets/images/contract-doctor-qyhz.png" slot='icon' />
			</cell>
			<cell :title="'患者评价( '+doctorEvaluation+' )'" is-link :link="{path:'/homeRouterView/contractDoctorEveluate',query:{id:details.ID}}">
				<img src="~assets/images/contract-doctor-hzpj.png" slot='icon' />
			</cell>
		</group>
		<confirm v-model="confirm" title="备注" @on-confirm="onConfirm">
			<x-textarea v-model='applyText' placeholder="请输入备注" :rows='4'></x-textarea>
		</confirm>
	</div>
</template>
<script>
	import { XHeader, Group, Cell, Rater, Confirm, XTextarea } from 'vux'
	export default {
		name: 'contractDoctorDetails',
		data() {
			return {
				confirm: false,
				details: {}, //医生信息
				doctorEvaluation: '', //医生评价数量
				applyText: '' //备注
			}
		},
		computed: {
			//是否签约 0未签约1已签约
			isSign() {
				if(this.$route.query.isSign == 0) {
					return false
				} else {
					return true
				}
			}
		},
		methods: {
			//获取医生的评价数量
			getCommentStat() {
				this.$common.ajax({
					result: true,
					data: {
						header: {
							action: 'GetCommentStat',
						},
						body: {
							DoctorID: this.$route.query.id
						}
					},
					success: (res) => {
						this.doctorEvaluation = res.TotalCount;
					}
				})
			},
			getData() {
				this.$common.ajax({
					result: true,
					data: {
						header: {
							action: 'GetDoctorInfo',
						},
						body: {
							DoctorID: this.$route.query.id,
							mobile: '',
							keyword: ''
						}
					},
					success: (res) => {
						this.details = res;
						this.details.ServiceStar = parseFloat(this.details.ServiceStar)

					}
				})
			},
			//签约医生
			addPatientSignApply() {
				this.$common.ajax({
					data: {
						header: {
							action: 'AddPatientSignApply',
						},
						body: {
							DoctorID: this.$route.query.id,
							UserID: this.$common.getLocalStorage('user').userid,
							Direction: 1,
							ApplyText: this.applyText
						}
					},
					success: (res) => {
						this.$vux.toast.show({
							text: '签约请求已发送'
						});

					}
				})
			},
			//解除签约
			deletePatientSign() {
				this.$common.ajax({
					data: {
						header: {
							action: 'DeletePatientSign',
						},
						body: {
							DoctorID: this.$route.query.id,
							UserID: this.$common.getLocalStorage('user').userid,
							UnSignDirection: '1',
							UnSignText: this.applyText
						}
					},
					success: (res) => {
						this.$vux.toast.show({
							text: '解除签约请求已发送'
						});

					}
				})
			},
			onConfirm() {
				this.isSign ? this.deletePatientSign() : this.addPatientSignApply()
			}
		},
		mounted() {
			this.getData();
			this.getCommentStat();
		},

		components: {
			XHeader,
			Group,
			Cell,
			Rater,
			Confirm,
			XTextarea
		}
	}
</script>

<style lang="less">
	.view-doctor-details {
		.common-user-details {
			background-color: #f0f5fb;
		}
		.instrument-box {
			text-align: center;
			font-size: 42px;
			color: #fff;
			padding: 20px 40px;
			width: 450px;
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
				background: url(~assets/images/contract-doctor-yygh.png) no-repeat center;
				background-size: contain;
			}
			&.active {
				background: @primary-color;
			}
		}
	}
</style>