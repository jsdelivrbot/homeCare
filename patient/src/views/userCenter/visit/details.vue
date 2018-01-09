<template>
	<div class='view-visit-details'>
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
		<div class="comment">
			<group class="common-menu-list">			
			<cell title="星级：">
				<rater v-model="submitData.Star" active-color="#FF9900" :margin="4" slot='child' :disabled='isComment'></rater>
			</cell>
			<x-textarea  v-model="submitData.Content" placeholder='评论内容' :readonly='isComment'></x-textarea>
			</group>
			<!--<x-button v-if='isComment'  class='common-login-btn register-btn' text='删除评论' @click.native="deleteComment" type="warn" ></x-button>-->
			<x-button v-if='!isComment'  class='common-login-btn register-btn' text='提交评论' @click.native="addComment" type="primary" ></x-button>
			
		</div>
	</div>
</template>

<script>
	import { XHeader,Rater,Group, Cell ,XTextarea ,XButton } from 'vux'
	export default {
		name: 'visitDetails',
		data() {
			return {
				
			}
		},
		computed: {
			isComment(){
				return this.$route.query.details.CommentID!='0'?true:false
			},
			details() {
				return this.$route.query.details
			},
			submitData(){
					return{
						VisitID:this.$route.query.details.ID,
						DoctorID:this.$route.query.details.DoctorID,
						UserID:this.$common.getLocalStorage('user').userid,
						Content:this.isComment?this.$route.query.details.CommentContent:'',
						Star:this.isComment?parseFloat(this.$route.query.details.CommentStar):0,
					}
				}
		},
		methods: {
			addComment(){
				if(this.submitData.Content!='') {
					this.$vux.confirm.show({
						title: '提示',
						content: '确认提交？',
						onConfirm: () => {
							this.$common.ajax({
								data: {
									header: {
										action: 'AddComment',
									},
									body: this.submitData
								},
								success: (res) => {
									this.$vux.toast.show({
										text: '评论成功',
										onHide: () => {
											this.$router.go(-1);
										}
									});
								}
							})
						}
					})
				} else {
					this.$vux.toast.show({
						text: '评论内容不能为空',
						type: 'text'
					});
				}
			},
			deleteComment(){
				this.$vux.confirm.show({
						title: '提示',
						content: '确认删除？',
						onConfirm: () => {
							this.$common.ajax({
								data: {
									header: {
										action: 'DeleteComment',
									},
									body: {
										CommentID:this.$route.query.details.CommentID
									}
								},
								success: (res) => {
									this.$vux.toast.show({
										text: '删除成功',
										onHide: () => {
											this.$router.go(-1);
										}
									});
								}
							})
						}
					})
			},
		},
		mounted() {
		},

		components: {
			XHeader,Rater,Group, Cell ,XTextarea ,XButton
			

		}
	}
</script>

<style lang="less" >
	.view-visit-details {
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
		.comment{
			position: fixed;
			bottom:0px;
			width: 100%;
			.common-menu-list{
			}
			.vux-rater{
				margin-top: 30px;
			}
			textarea{
				font-size:42px;
			}
			button{
				width: 100%;
				border-radius: 0px;
			}
		}
	}
</style>