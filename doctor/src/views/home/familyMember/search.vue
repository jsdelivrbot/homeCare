<template>
	<div class='view-family-member-search'>
		<div class="common-search">
			<input type="text" v-model='search' @keyup.enter='getData' placeholder="请输入手机号" />
		</div>
		<div class="list">
			<spinner type="ios" v-if='loading'></spinner>
			<div v-else>
				<div v-if='details.HeaderPhoto'>
					<!--<router-link :to="{path: '/familyMemberDetails',query:{id:details.ID}}">-->
						<div class="common-box-list">
							<div class="box-body">
								<div class="img">
									<img :src="details.HeaderPhoto" />
								</div>
								<div class="text">
									<p>
										<span class='name'>{{details.RealName}}</span>
										<span class='sex'>{{$common.sexType[details.Sex]}}</span>
										<span class='age'>42岁</span>
									</p>
									<p>
										<span class='tel'>联系电话：{{details.Mobile}}</span>
									</p>
								</div>
							</div>
						</div>
					<!--</router-link>-->
					<x-button type="primary" @click.native='confirm=true'>添加到家庭成员</x-button>
				</div>
			</div>
		</div>
		<confirm v-model="confirm" title="提交" @on-cancel="onCancel" @on-confirm="onConfirm">
			<x-textarea v-model='applyText' placeholder="请输入备注" autosize></x-textarea>
		</confirm>
	</div>
</template>

<script>
	import { XHeader, Search, Spinner, XButton, Confirm, XTextarea } from 'vux';
	import mixins from 'assets/js/mixins.js'
	export default {
		name: 'familyMembersearch',
		mixins: [mixins.addConcernApply],
		data() {
			return {
				loading: false,
				search: '', //查询输入的值				
			}
		},
		methods: {
			getData() {
				if(this.search != '') {
					this.loading = true;
					this.$common.ajax({
						result: true,
						data: {
							header: {
								action: 'GetUserInfo',
							},
							body: {
								userid: '',
								keyword: '',
								Mobile: this.search
							}
						},
						success: (res) => {
							this.loading = false;
							this.details = res
						},
						error: () => {
							this.loading = false;
						}
					})
				} else {
					this.$vux.toast.show({
						text: '请填写完整',
						type: 'text'
					});
				}
			}
			
		},
		mounted() {
		},

		components: {
			XHeader,
			Search,
			Spinner,
			XButton,
			Confirm,
			XTextarea
		}
	}
</script>

<style lang="less" scoped>
	.view-family-member-search {
		padding-top: 110px;
		
		.box-body {
			background: #fff;
			padding: 30px 60px;
		}
		button.weui-btn {
			border-radius: 15px;
			margin-top: 60px;
			width: 90%;
			padding: 10px 0px;
		}
	}
	/*.familyMember {
		ul {
			li {
				width: 100%;
				background: #fff;
				padding: 10px 10px;
				margin-bottom: 10px;
				border-bottom: 10px solid #f1f1f1;
				float: left;
				.img {
					float: left;
					width: 70px;
					height: 70px;
					border-radius: 100%;
					overflow: hidden;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.text {
					float: left;
					width: 74%;
					padding-left: 4%;
					h3 {
						font-size: 16px;
					}
					p {
						font-size: 14px;
					}
				}
			}
		}
	}*/
</style>