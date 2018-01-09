<template>
	<div class='view-health-program'>
		<div class="common-header-right">
			<router-link :to="{path: '/homeRouterView/healthInterventionProgramAdd'}">添加</router-link>
		</div>
		<scroller ref='scroller' class='common-scroller' :on-refresh="refresh" :on-infinite="infinite">
			<spinner type="lines" slot="refresh-spinner"></spinner>
			<spinner type="dots" slot="infinite-spinner"></spinner>
			<ul class="clearfix">
				<li v-for='(t,i) in list'>
					<router-link :to="{path: '/homeRouterView/healthInterventionProgramDetails',query:{id:t.ID}}">
						<div class="common-box-list">
							<div class="box-body">
								<div class="img">
									<img :src="t.UserHeaderPhoto" />
								</div>
								<div class="text">
									<p>
										<span class='name'>{{t.RealName}}</span>
										<span class='time'>{{t.AddTime.split(' ')[0]}}</span>
									</p>
									<p>
										<span>{{$common.sexType[t.Sex]}}</span>
										<span>{{t.UserAge}}岁</span>
									</p>
								</div>
							</div>
							<div class="box-footer">
								{{t.Content}}
							</div>
						</div>

					</router-link>
				</li>
			</ul>
		</scroller>
		<dateTime ref='dateTime' @on-change='getData'></dateTime>
	</div>
</template>

<script>
	import { XHeader, Spinner } from 'vux'
	import dateTime from 'components/dateTime'
	import mixins from 'assets/js/mixins.js'
	export default {
		name: 'healthInterventionProgram',
		mixins: [mixins.scroller],
		data() {
			return {

			}
		},
		computed: {
			ajaxData() {
				return {
					header: {
						action: 'GetHealthSuggestList',
					},
					body: {
						userid: this.$route.query.userId,
						DoctorID: this.$common.getLocalStorage('user').doctorid,
						starttime: this.$refs.dateTime.startTime,
						endtime: this.$refs.dateTime.endTime
					}
				}
			}
		},
		methods: {},
		mounted() {

		},

		components: {
			XHeader,
			Spinner,
			dateTime
		}
	}
</script>

<style lang="less" scoped>
	.view-health-program {
		.common-scroller {
			background: #e3e3e5;
			/*height: 95%;*/
			ul {
				padding-top: 20px;
				padding-bottom: 20px;
				width: 95%;
				margin: 0 auto;
				li {
					border: 1px solid #cdcdcf;
					background: #fff;
					margin-bottom: 20px;
					border-radius: 15px;
					padding: 40px 30px;
				}
			}
		}
		.common-box-list {
			.box-body {
				.text {
					p {
						font-size: 36px;
					}
				}
			}
		}
		.common-date-time {
			position: fixed;
			bottom: 0px;
			width: 100%;
		}
	}
</style>