<template>
	<div class='view-health-program-details'>
		<div class="common-box-list">
			<div class="box-body">
			<i class="triangle"></i>
			<div class="img">
				<img :src="details.DoctorHeaderPhoto" />
			</div>
			<div class="text">
				<p>
					<span class='name'>{{details.DoctorName}}</span>
					<span class='sex'>{{$common.sexType[details.Sex]}}</span>
					<span class='age'>{{details.UserAge}}岁</span>
				</p>
				<p>
					<span class='department'>{{details.DepartName}}</span>
					<span class='position'>{{details.ClinicalTitle}}</span>
				</p>
			</div>
		</div>
		</div>
		<div class="box-details">
			<p>{{details.Content}}</p>
			<div class="box-footer">
				{{details.AddTime}}
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	export default {
		name: 'healthInterventionProgramDetails',
		data() {
			return {
				details: {},
			}
		},
		methods: {
			getData() {
				this.$common.ajax({
					result:true,
					data: {
						header: {
							action: 'GetHealthSuggestByID',
						},
						body: {
							SuggestID: this.$route.query.id.toString()
						}
					},
					success: (res) => {
						this.details = res
					}
				})
			},
		},
		mounted() {
			this.getData();
			document.querySelector('.view-health-program-details').style.height=window.innerHeight+'px';
		},

		components: {
			XHeader,

		}
	}
</script>

<style lang="less" scoped>
	.view-health-program-details {
		padding-top: 110px;
		overflow: hidden;
		background: #e3e3e5;
		.box-body {
			background: #fff;
			padding: 30px 60px;
			position: relative;
		}
		.box-details{
			border:1px solid @gray;
			background: #fff;
			border-radius:15px;			
			width: 900px;
			margin: 0 auto;
			margin-top: 60px;
			padding:30px 60px;
			p{
				font-size:42px;
				word-break: break-all;
				min-height:80px;
			}
			.box-footer{
				font-size:38px;
				text-align: right;
				color:#989898;
				margin-top: 40px;
			}
		}
	}
</style>