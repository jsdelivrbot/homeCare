<template>
	<div class="view-department">
		<div class="list">
			<spinner type="ios" v-if='loading'></spinner>
			<div class="wrap-item" v-for='t in list' :key='t.ID'>
				<divider>
					<router-link :to="{path: '/homeRouterView/contractDoctor',query:{departmentId:t.ID,hospitalId:$route.query.id}}">
						{{t.DepartName}}
					</router-link>
				</divider>
				<ul class="clearfix">
					<li v-for='tt in t.SubDeparts' :key='tt.ID'>
						<router-link :to="{path: '/homeRouterView/contractDoctor',query:{departmentId:tt.ID,hospitalId:$route.query.id}}">
							{{tt.DepartName}}
						</router-link>
					</li>

				</ul>
			</div>
		</div>		
	</div>
</template>

<script>
	import { XHeader, Divider, Spinner } from 'vux'
	export default {
		data() {
			return {
				loading: false,
				list: [],
			}
		},
		methods: {
			getData() {
				this.loading=true;
				this.$common.ajax({
					loading: false,
					result: true,
					data: {
						header: {
							action: 'GetDepartList',
						},
						body: {
							HospitalID: this.$route.query.id,
							ParentID: '',
							KeyWord: ''
						}
					},
					success: (res) => {
						this.loading=false;
						this.list = res;
					}
				})
			},
		},
		mounted() {
			this.getData();
		},

		components: {
			XHeader,
			Divider,
			Spinner
		}
	}
</script>

<style lang="less" scoped>
	.view-department {
		padding-top: 110px;
		background: #e3e3e5;
		.list {
			margin-top: 60px;
			.wrap-item {
				margin-bottom: 80px;
				.vux-divider {
					width: 900px;
					margin: 0 auto;
					font-size: 42px;
					margin-bottom: 60px;
				}
				ul {
					background: #fff;
					min-height: 50px;
					li {
						position: relative;
						font-size: 42px;
						
						margin: 0px;
						float: left;
						width: 50%;
						text-indent: 1em;
						background: #fff;
						margin-top: 2px;
						&::before {
							content: " ";
							position: absolute;
							left: 0;
							bottom: 0;
							right: 0;
							height: 1px;
							border-bottom: 4px solid #C7C7C7;
							color: #C7C7C7;
							-webkit-transform-origin: 0 100%;
							transform-origin: 0 100%;
							-webkit-transform: scaleY(0.5);
							transform: scaleY(0.5);
						}
						&::after {
							content: " ";
							position: absolute;
							right: 0;
							top: 0;
							width: 1px;
							bottom: 0;
							border-right: 4px solid #C7C7C7;
							color: #C7C7C7;
							-webkit-transform-origin: 100% 0;
							transform-origin: 100% 0;
							-webkit-transform: scaleX(0.5);
							transform: scaleX(0.5);
						}
						a{
							padding: 40px 0;
							display: block;
						}
					}
				}
			}
		}
	}
</style>