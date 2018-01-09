<template>
	<div class='view-health-program-details'>
		<div class="common-header-right" @click='editHealthSuggest'>提交</div>
		<div class="common-box-list">
			<div class="box-body">
				<i class="triangle"></i>
				<div class="img">
					<img :src="details.UserHeaderPhoto" />
				</div>
				<div class="text">
					<p>
						<span class='name'>{{details.RealName}}</span>
						<span class='sex'>{{$common.sexType[details.Sex]}}</span>
						<span class='age'>{{details.UserAge}}岁</span>
					</p>
					<!--<p>
					<span class='department'>{{details.DepartName}}</span>
					<span class='position'>{{details.ClinicalTitle}}</span>
				</p>-->
				</div>
			</div>
		</div>
		<div class="box-details">
			<x-textarea v-model="details.Content" autosize></x-textarea>
			<div class="box-footer">
				{{details.AddTime}}
			</div>
		</div>
	</div>
</template>

<script>
	import { XHeader, XTextarea } from 'vux'
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
					result: true,
					data: {
						header: {
							action: 'GetHealthSuggestByID',
						},
						body: {
							SuggestID: this.$route.query.id
						}
					},
					success: (res) => {
						this.details = res
					}
				})
			},
			editHealthSuggest() {
				this.$vux.confirm.show({
					title: '提示',
					content: '确认提交信息？',
					onConfirm: () => {
						this.$common.ajax({
							data: {
								header: {
									action: 'EditHealthSuggest',
								},
								body: {
									SuggestID: this.$route.query.id,
									Content: this.details.Content
								}
							},
							success: (res) => {
								this.$vux.toast.show({
									text: '修改成功',
									onHide: () => {
										this.$router.go(-1);
									}
								})
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
			XTextarea

		}
	}
</script>

<style lang="less">
	.view-health-program-details {
		padding-top: 110px;
		overflow: hidden;
		background: #e3e3e5;
		.box-body {
			background: #fff;
			padding: 30px 60px;
			position: relative;
			.img {
				vertical-align: -23px!important;
			}
		}
		.box-details {
			border: 1px solid @gray;
			background: #fff;
			border-radius: 15px;
			width: 900px;
			margin: 0 auto;
			margin-top: 60px;
			padding: 30px 60px;
			p {
				font-size: 42px;
				word-break: break-all;
				min-height: 80px;
			}
			.box-footer {
				font-size: 38px;
				text-align: right;
				color: #989898;
				margin-top: 40px;
			}
		}
		textarea {
			overflow-y: scroll!important;
			font-size: 42px;
			min-height:1000px;
		}
	}
</style>