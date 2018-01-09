<template>
	<div class='view-health-program'>
		<scroller ref='scroller' class='common-scroller' :on-refresh="refresh" :on-infinite="infinite">
			<spinner type="lines" slot="refresh-spinner"></spinner>
			<spinner type="dots" slot="infinite-spinner"></spinner>
			<ul class="clearfix">
				<li v-for='(t,i) in list'>
					<router-link :to="{path: '/homeRouterView/healthInterventionProgramDetails',query:{id:t.ID}}">
						<div class="common-box-list">
							<div class="box-body">
							<div class="img">
								<img :src="t.DoctorHeaderPhoto" />
							</div>
							<div class="text">
								<p>
									<span class='name'>{{t.DoctorName}}</span>
									<span class='sex'>{{$common.sexType[t.Sex]}}</span>
									<span class='age'>{{t.UserAge}}岁</span>
									<span class='time'>{{t.AddTime.split(' ')[0]}}</span>
								</p>
								<p>
									<span class='department'>{{t.DepartName}}</span>
									<span class='position'>{{t.ClinicalTitle}}</span>
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
		name:'healthInterventionProgram',
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
						userid: this.$route.query.userId||this.$common.getLocalStorage('user').userid,
						starttime:this.$refs.dateTime.startTime,
						endtime:this.$refs.dateTime.endTime
					}
				}
			}
		},
		methods: {		
		},
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
		.common-scroller{
			background: #e3e3e5;
			height:95%;
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
		
		.common-date-time {
			position: fixed;
			bottom: 0px;
			width: 100%;
		}
	}
</style>