<template>
	<div class='view-visit'>
		<scroller ref='scroller' class='common-scroller' :on-refresh="refresh" :on-infinite="infinite">
			<spinner type="lines" slot="refresh-spinner"></spinner>
			<spinner type="dots" slot="infinite-spinner"></spinner>
			<div class="list">
				<ul class="clearfix">
					<li v-for='(t,i) in list' v-if='t.StateID!=3'>
						<router-link :to="{path: '/userCenterRouterView/visitDetails',query:{details:t}}">
							<div class="img">
								<img :src="t.DoctorHeaderPhoto" />
							</div>
							<div class="text">
								<h1>{{t.DoctorName}}<span>{{t.ClinicalTitle}}</span></h1>
								<p>{{t.AgencyName}}</p>
								<p class='time'>就诊时间：{{t.AddTime}}</p>
							</div>
							<div class="bottom" v-if='t.StateID==0' @click='deleteAppointment(t,i)'>取消签约</div>
							<div class="state" :class='{active:t.CommentID=="0"}'></div>
						</router-link>
					</li>
				</ul>
			</div>
		</scroller>
		<dateTime ref='dateTime' @on-change='getData'></dateTime>
	</div>
</template>
<script>
	import { XHeader, Spinner } from 'vux'
	import mixins from 'assets/js/mixins.js'
	import dateTime from 'components/dateTime'
	export default {
		name: 'appointment',
		mixins: [mixins.scroller],
		data() {
			return {
				state: {
					0: 'warn', //未评论
					1: 'success', //已评论
				}
			}
		},
		computed: {
			ajaxData() {
				return {
					header: {
						action: 'GetVisitList',
					},
					body: {
						UserID: this.$common.getLocalStorage('user').userid
					}
				}
			}
		},
		methods: {
		},
		mounted() {},
		components: {
			XHeader,
			Spinner,
			dateTime
		}
	}
</script>

<style lang="less" scoped>
	.view-visit {
		height: 100%;
		background: #fff;
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
						margin-top: 20px;
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
								background: @primary-color;
								color: #fff;
								padding: 5px 20px;
								border-radius: 10px;
								font-size: 34px;
								margin-left: 10px;
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
						background: url(~assets/images/vist-success.png) no-repeat;
						background-size: contain;				
						&.active {
							background: url(~assets/images/vist-warn.png) no-repeat;
							background-size: contain;
						}
						
					}
					.bottom {
						background: #e64340;
						color:#fff;
						padding:20px 0px;
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