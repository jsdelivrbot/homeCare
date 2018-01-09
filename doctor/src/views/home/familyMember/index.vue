<template>
	<div class='view-family-member'>
		<scroller ref='scroller' class='common-scroller' :on-refresh="refresh" :on-infinite="infinite">
			<spinner type="lines" slot="refresh-spinner"></spinner>
			<spinner type="dots" slot="infinite-spinner"></spinner>
			<div class="list">
				<ul class="clearfix">
					<li v-for='(t,i) in list'>
					<router-link :to="{path: '/homeRouterView/familyMemberDetails',query:{id:t.UserID}}">
						<div class="common-box-list">
							<div class="box-body">
							<div class="img">
								<img :src="t.UserHeaderPhoto" />
							</div>
							<div class="text">
								<p>
									<span class='name'>{{t.RealName}}</span>
									<span class='sex'>{{$common.sexType[t.Sex]}}</span>
									<span class='age'>{{t.UserAge}}岁</span>									
								</p>
								<p>
									<span class='tel'>联系电话：{{t.Mobile}}</span>
								</p>
							</div>
						</div>
						</div>												
					</router-link>
				</li>
				</ul>
			</div>
		</scroller>
	</div>
</template>
<script>
	import { XHeader, Rater, Spinner } from 'vux'
	import mixins from 'assets/js/mixins.js'
	export default {
		name: 'contractDoctor',
		mixins: [mixins.scroller],
		data() {
			return {
			}
		},
		computed: {
			ajaxData() {
				return {
					header: {
						action: 'GetPatientSignList',
					},
					body: {
						DoctorID: this.$common.getLocalStorage('user').doctorid,
						CheckState: '1',
						
					}
				};
			}
		},
		methods: {

		},
		mounted() {},
		components: {
			XHeader,
			Rater,
			Spinner
		}
	}
</script>

<style lang="less" scoped>
	.view-family-member {
		padding-top: 110px;
		
			.vux-button-group{
			background:#007ab3;
			width: 90%;
			margin:0 auto;
			
			padding:5px;
			border-radius: 15px;
			a{
				font-size:42px;
				height:100px;
				line-height: 100px;
				  background: #007ab3;
				  color:#fff;
				  border-radius: 15px;
				&.vux-button-group-current{
					    background: #fff;
					    color: #007ab3;
				}
				&::after{
					border:none;
				}
			}
		}
		.list{
			
			width: 100%;
			
			li{
					padding: 40px;
					border-bottom:1px solid @gray;
			}
		
		}
	}
</style>