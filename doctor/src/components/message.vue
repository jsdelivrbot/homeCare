<template>
	<div class='common-message common-padding'>
		<x-header :title='$route.name' :left-options="{showBack: false}"></x-header>
		<div class="content">
			<div class="logo">
				<img src="~assets/images/ic_launcher.png" />
			</div>
			<div class="title">
				{{details.Title}}
			</div>
			<ul class="clearfix">
				<li>
					<span class="t">通知时间</span>
					<span>{{details.MeterTime}}</span>
				</li>
				<li>
					<span class="t">通知内容</span>
					<span v-html='details.WarnResult'></span>
				</li>
			</ul>
			<div class="btn-group" v-if='details.CheckState==0'>
				<x-button class='common-login-btn' type="primary" @click.native='operation(1)'>通过</x-button>
				<x-button class='common-login-btn' type="warn" @click.native='operation(2)'>拒绝</x-button>
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, XButton } from 'vux'
	export default {
		name: 'message',
		data() {
			return {				
				details: {
					CheckState: 1
				}
			}
		},
		computed: {
			//地址传过来的参数
			locationSearch() {
				return this.$common.locationSearch()
			},
			//操作提交的数据的id字段名
			idType() {
				return this.details.Action == 'checkpatientsign'?'SignID':'ConcernID'
			}
		},
		methods: {
			getData() {
				this.$common.ajax({
					result: true,
					data: {
						header: {
							action: 'GetHealthWarnForWx',
						},
						body: this.locationSearch
					},
					success: (res) => {
						this.details = res;
					}
				})
			},
			operation(type) {
				this.$vux.confirm.show({
					title: '提示',
					content: '确认操作？',
					onConfirm: () => {	
						var bodyData={
							CheckState: type
						}						
						bodyData[this.idType]=this.details.ID;
						this.$common.ajax({
							result: true,
							data: {
								header: {
									action: this.details.Action
								},
								body: bodyData
							},
							success: (res) => {
								this.$vux.toast.show({
									text: '操作成功',
									onHide: () => {
										this.getData()
									}
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
			XHeader,
			XButton
		}
	}
</script>

<style lang="less" scoped>
	.common-message {
		background: rgba(255, 255, 255, 0.29);
		.content {
			.title {
				padding: 0px 80px;
				margin-top: 30px;
				margin-bottom: 60px;
				text-align: center;
				font-size: 52px;
				font-weight: bold;
			}
			ul {
				li {
					float: left;
					width: 100%;
					padding: 20px 0px;
					margin-top: -3px;
					background: #fff;
					font-size: 42px;
					border-top: 1px solid #d3d3d3;
					border-bottom: 1px solid #d3d3d3;
					span {
						margin-left: 40px;
						margin-right: 30px;
						color: #000;
						display: block;
						float: left;
						width: 770px;
						&.t {
							margin-right: 0;
							width: 200px;
							color: #aaaaaa;
						}
					}
				}
			}
			.logo {
				width: 250px;
				margin: 0 auto;
				margin-top: 100px;
				img {
					width: 100%;
				}
			}
			.btn-group {
				position: fixed;
				bottom: 0px;
				width: 100%;
				button {
					border-radius: 0px;
					width: 50%;
					margin-top: 0;
					float: left;
				}
				margin-top: 50px;
			}
		}
	}
</style>