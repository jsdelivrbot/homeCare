<template>
	<div class='view-family-member-search'>
		<div class="common-search">
			<input type="text" @keyup.enter='getData' v-model='search' placeholder="请输入手机号"/>
			<div class='common-search-icon' @click='getData'>
				<x-icon type="ios-search" size="30"></x-icon>
			</div>
			<!--<x-button slot="right" type="primary" mini>搜索</x-button>-->
			<!--<x-input   v-model='search' placeholder="请输入手机号">
        <x-button slot="right" type="primary" mini>搜索</x-button>
      </x-input>-->
		</div>
		<div class="list">
			<spinner type="ios" v-if='loading'></spinner>
			<div v-else>
				<div v-for='t in list' style='position: relative;margin-bottom: 10px;border-bottom: 10px solid #dfdfdf;'>
					<!--<router-link :to="{path: '/familyMemberDetails',query:{id:details.ID}}">-->
					<div class="common-box-list">
						<div class="box-body">
							<div class="img">
								<img :src="t.HeaderPhoto" />
							</div>
							<div class="text">
								<p>
									<span class='name'>{{t.RealName}}</span>
									<span class='sex'>{{$common.sexType[t.Sex]}}</span>
									<!--<span class='age'>42岁</span>-->
								</p>
								<p>
									<span class='tel'>联系电话：{{t.Mobile}}</span>
								</p>
							</div>
						</div>
					</div>
					<!--</router-link>-->
					<x-button mini plain  type="primary" @click.native='openConfirm(t)'>添加</x-button>
				</div>
			</div>
		</div>
		<confirm v-model="confirm" title="提交" @on-cancel="onCancel" @on-confirm="onConfirm">
			<x-textarea v-model='applyText' placeholder="请输入备注" autosize></x-textarea>
		</confirm>
	</div>
</template>

<script>
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
		mounted() {},
		methods: {
			openConfirm(obj) {
				this.details=obj;
				this.confirm=true;

			},
			getData() {
				if(this.search != '') {
					this.loading = true;
					this.$ajax({
						data: {
							header: {
								action: 'GetUserList',
							},
							body: {
								userid: '',
								keyword: this.search,
								Mobile: ''
							}
						},
						success: (res) => {
							this.loading = false;
							this.list = res
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
		

	}
</script>

<style lang="less" scoped>
	.view-family-member-search {
		padding-top: 110px;
		.box-body {
			background: #fff;
			padding: 30px 60px;
		}
		.list{
			button.weui-btn {
			position: absolute;right: 20px;top:65px;
		}
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