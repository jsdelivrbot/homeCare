<template>
	<div class='view-health-program-add'>
		<div class="common-header-right" @click='AddHealthSuggest'>提交</div>
		<div class="common-box-list">
			<div class="box-body" @click='$refs.memberFamily.show=true'>
				<div class="img">
					<img :src="details.UserHeaderPhoto" />
				</div>
				<div class="text">
					<p>
						<span>{{details.RealName}}</span>
					</p>
				</div>
			</div>
		</div>
		<div class="box-details">
			<x-textarea v-model="details.Content" placeholder='请填写您要给患者的健康建议' :rows='15'></x-textarea>
			<div class="box-footer">
				{{details.AddTime}}
			</div>
		</div>
		<memberFamily ref='memberFamily' @on-hide='memberFamilyChange'></memberFamily>
	</div>
</template>
<script>
	import { XHeader, XTextarea } from 'vux'
	import memberFamily from 'components/memberFamily.vue'
	export default {
		name: 'healthInterventionProgramAdd',
		data() {
			return {
				details: {
					RealName: '请选择患者',
					UserHeaderPhoto: '',
					UserIDCard: '',
					UserID: '',
					Content: ''
				}
			}
		},
		computed: {

		},
		methods: {
			memberFamilyChange(opt) {
				for(let attr in this.details) {
					this.details[attr] = opt[attr];
				}
			},
			AddHealthSuggest() {
				if(this.details.UserID != '' && this.details.Content != '') {
					this.$vux.confirm.show({
						title: '提示',
						content: '确认提交信息？',
						onConfirm: () => {
							this.$common.ajax({
								data: {
									header: {
										action: 'AddHealthSuggest',
									},
									body: {
										UserID: this.details.UserID,
										IDCard: this.details.UserIDCard,
										DoctorID: this.$common.getLocalStorage('user').doctorid,
										Content: this.details.Content
									}
								},
								success: (res) => {
									this.$vux.toast.show({
										text: '添加成功',
										onHide: () => {
											this.$router.go(-1);
										}
									})
								}
							})
						}
					})
				} else {
					this.$vux.toast.show({
						text: '请填写完整',
						type: 'text'
					})
				}
			}
		},
		mounted() {
			if(this.$route.query.details) {
				let routerDetails = JSON.parse(this.$route.query.details);
				this.details.UserID=routerDetails.ID;
				this.details.IDCard=routerDetails.IDCard;
				this.details.RealName=routerDetails.RealName;
				this.details.UserHeaderPhoto=routerDetails.HeaderPhoto;	
			} else {
				this.details.UserHeaderPhoto = this.$common.defaultHeaderPic
			}
		},

		components: {
			XHeader,
			XTextarea,
			memberFamily

		}
	}
</script>

<style lang="less">
	.view-health-program-add {
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
			.text {
				font-size: 42px;
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
			font-size: 42px;
			
		}
	}
</style>