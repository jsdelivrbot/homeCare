<template>
	<div class='view-appointment'>
		<div class="common-header-right">
			<img class='img-btn' src="~assets/images/common-menu.png" />
		</div>
		<scroller ref='scroller' class='common-scroller' :on-refresh="refresh" :on-infinite="infinite">
			<spinner type="lines" slot="refresh-spinner"></spinner>
			<spinner type="dots" slot="infinite-spinner"></spinner>
			<div class="list">
				<ul class="clearfix">
					<li v-for='(t,i) in list' @click='showConfirm(t,i)'>
						<!--<router-link  :to="{path: '/homeRouterView/appointmentDetails',query:{id:t.ID}}">-->
						<div class="img">
							<img :src="t.UserHeaderPhoto" />
						</div>
						<div class="text">
							<h1>{{t.RealName}}<span>{{$common.sexType[t.Sex]}}</span><span>{{t.UserAge}}岁</span></h1>
							<p class='time'>就诊时间：{{t.AppointVisitTime}}</p>
						</div>
						<div class="state" :class='state[t.StateID]'></div>
						<!--</router-link>-->
					</li>
				</ul>
			</div>
		</scroller>
		<popup-picker class='visit-state' :data="visitState" :columns="3" v-model="visitValue" @on-hide='getData'></popup-picker>
		<dateTime ref='dateTime' @on-change='getData'></dateTime>
		<confirm v-model="confirm" title="诊疗内容" @on-confirm="addVisit" @on-hide='hideConfirm'>
			<x-textarea v-model='applyText' placeholder="请输入诊疗内容" :rows='4'></x-textarea>
		</confirm>
	</div>
</template>
<script>
	import { XHeader, Spinner, PopupPicker, Confirm, XTextarea,dateFormat  } from 'vux'
	import mixins from 'assets/js/mixins.js'
	import dateTime from 'components/dateTime'
	export default {
		name: 'appointment',
		mixins: [mixins.scroller],
		data() {
			return {
				addVisitActive: {}, //当前点击的记录
				confirm: false,
				applyText: '', //备注
				visitState: [{
					name: '全部',
					value: ''
				}, {
					name: '未就诊',
					value: 0
				}, {
					name: '已就诊',
					value: 1
				}, {
					name: '过期',
					value: 2
				}, {
					name: '已取消',
					value: 3
				}],
				visitValue: [],
				state: {
					0: 'warn', //未就诊
					1: 'success', //已就诊
					2: 'overdue', //过期
					3: 'cancel' //已取消
				}
			}
		},
		computed: {
			ajaxData() {
				return {
					header: {
						action: 'GetAppointmentList',
					},
					body: {
						DoctorID: this.$common.getLocalStorage('user').doctorid,
						State: this.visitValue[0],
						timetype:'1',
						starttime: this.$refs.dateTime.startTime,
						endtime: this.$refs.dateTime.endTime
					}
				}
			}
		},
		methods: {
			hideConfirm(){
				this.applyText='';
			},
			showConfirm(opt) {
				if(opt.StateID == 0) {
					this.confirm = true;
					this.addVisitActive = opt;
				}
			},
			addVisit() {
				this.$common.ajax({
					data: {
						header: {
							action: 'AddVisit',
						},
						body: {
							UserID: this.addVisitActive.UserID,
							DoctorID: this.$common.getLocalStorage('user').doctorid,
							AppointmentID: this.addVisitActive.ID,
							VisitTime: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
							Content: this.applyText
						}
					},
					success: (res) => {
						this.$vux.toast.show({
							text: '添加成功'
						});
						this.getData();

					}
				})
			},
		},
		mounted() {
		},
		components: {
			XHeader,
			Spinner,
			dateTime,
			PopupPicker,
			Confirm,
			XTextarea
		}
	}
</script>

<style lang="less">
	.view-appointment {
		height: 100%;
		background: #fff;
		.visit-state {
			right: 0px;
			position: fixed;
			width: 150px;
			height: 100px;
			z-index: 999;
			.weui-cell_access:active{
				background: none;
			}
			.weui-cell {
				height: 100px;
				.weui-cell__ft {
					display: none;
				}
			}
			.vux-popup-picker-select {
				display: none;
			}
		}
		.list {
			ul {
				li {
					position: relative;
					padding: 40px 0px;
					/*margin-bottom: 90px;*/
					border-bottom: 2px solid @gray;
					width: 100%;
					float: left;
					.img {
						margin-left: 50px;
						width: 170px;
						height: 170px;
						overflow: hidden;
						border-radius: 100%;
						border: 2px solid #fff;
						float: left;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.text {
						float: left;
						margin-left: 40px;
						h1 {
							font-size: 56px;
							span {
								/*background: @primary-color;
								color: #fff;
								padding: 5px 20px;
								border-radius: 10px;*/
								font-size: 42px;
								margin-left: 40px;
							}
						}
						p {
							font-size: 42px;
							&.time {
								color: #808080;
							}
						}
					}
					.state {
						position: absolute;
						right: 0px;
						top: 0px;
						width: 200px;
						height: 200px;
						&.overdue {
							background: url(~assets/images/appointment-state-overdue.png) no-repeat;
							background-size: contain;
						}
						&.success {
							background: url(~assets/images/appointment-state-success.png) no-repeat;
							background-size: contain;
						}
						&.warn {
							background: url(~assets/images/appointment-state-warn.png) no-repeat;
							background-size: contain;
						}
						&.cancel {
							background: url(~assets/images/appointment-state-cancel.png) no-repeat;
							background-size: contain;
						}
					}
					.bottom {
						background: #e64340;
						color: #fff;
						padding: 20px 0px;
						margin-top: 30px;
						float: left;
						width: 100%;
						text-align: center;
						font-size: 42px;
					}
				}
			}
		}
	}
</style>