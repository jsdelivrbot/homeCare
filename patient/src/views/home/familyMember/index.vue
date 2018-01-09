<template>
	<div class='view-family-member'>
		<div class="common-header-right">
				<router-link :to="{path:'/homeRouterView/familyMemberSearch'}">添加</router-link>
		</div>
		<div class='content'>
			<button-tab>
			<button-tab-item selected @on-item-click='getData({type:"0"})'>我关注的人</button-tab-item>
			<button-tab-item @on-item-click='getData({type:"1"})'>关注我的人</button-tab-item>
		</button-tab>
		<div class="list">
			<spinner type="ios" v-if='loading'></spinner>			
			<ul v-else class="clearfix">
				<li v-for='(t,i) in list'>
					<router-link :to="{path: '/homeRouterView/familyMemberDetails',query:{id:t.UserID,concernId:t.ID,type:type}}">
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
					</router-link>
				</li>
			</ul>
			<div class="common-no-data" v-if='list.length<=0' style='background: none;'>没有更多数据</div>
		</div>
		
		</div>

	</div>
</template>
<script>
	import { XHeader, Spinner, ButtonTab, ButtonTabItem } from 'vux'
	export default {

		data() {
			return {
				type:0 ,//0家庭成员1监护人
				loading: true,
				list: []
			}
		},
		methods: {
			getData(opt) {
				this.type=opt.type;
				this.loading = true;
				this.$common.ajax({
					loading: false,
					result: true,
					data: {
						header: {
							action: 'GetConcernList',
						},
						body: {
							userid: this.$common.getLocalStorage('user').userid,
							Type: this.type
						}
					},
					success: (res) => {
						this.loading = false;
						this.list = res;
					}
				})
			}

		},
		mounted() {
			this.getData({type:'0'});
		},

		components: {
			XHeader,
			Spinner,
			ButtonTab,
			ButtonTabItem
		}
	}
</script>

<style lang="less" scoped>
	.view-family-member {
		padding-top: 110px;
		.content{
			padding-top: 40px;
			background: #fff;
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
			border-top:1px solid @gray;
			width: 100%;
			margin-top: 40px;
			li{
					padding: 40px;
			}
		}
		}
	}
</style>