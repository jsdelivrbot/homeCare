<template>
	<div class='view-user-edit-data common-padding'>
		<div class="common-header-right">
			<a @click='setUserDetails'>提交</a>
		</div>
		<group>
			<div class="img-box">
				<cell title="头像" is-link @click.native='file' class='userPicCell'> </cell>
				<input class='pic-input' @change='fileChange' type="file" ref='file' accept="image/*" />
				<span class='pic-img'><img class='userPic' :src="userDetails.HeaderPhoto"/></span>
			</div>
			<x-input title="手机号码" disabled v-model='userDetails.Mobile' placeholder="请输入手机号码" type="tel" placeholder-align='right'></x-input>
			<x-input title="姓名" disabled v-model='userDetails.RealName' placeholder="请输入姓名"></x-input>
			<x-input title="身份证" disabled v-model='userDetails.IDCard' placeholder="请输入身份证" type="tel"></x-input>
			<selector title="性别" readonly v-model='$common.sexType[userDetails.Sex]' :options='sexSelect'></selector>
			<x-address ref='addressSelect' title="二级省市" v-model="addressSelect" :list="addressData" placeholder="请选择城市"></x-address>
			<x-input class='address' title="地址" v-model='userDetails.Address' placeholder="请输入地址"></x-input>
			<x-input class='medical-history' title="个人病史" v-model='userDetails.MedicalHistory' placeholder="请输病史" disabled @click.native='textareaShow=true'></x-input>
		</group>
		<popup v-model="textareaShow">
			<x-textarea v-model='userDetails.MedicalHistory' placeholder="请输入个人病史" :rows='5'   :height='300'></x-textarea>
		</popup>

	</div>
</template>
<script>
	import { Cell, Group, XInput, XAddress, PopupPicker, ChinaAddressV3Data, XTextarea, Selector, XHeader, Popup, Value2nameFilter as value2name } from 'vux'
	import lrz from 'lrz' //图片压缩插件	
	export default {
		data() {
			return {
				sexSelect: [{
					key: '-1',
					value: '未知'
				}, {
					key: '1',
					value: '男'
				}, {
					key: '0',
					value: '女'
				}],
				userDetails: {},
				textareaShow: false
			}
		},
		computed: {
			//获取浏览器缓存LocalStorage里的城市json
			addressData() {
				return this.$common.getLocalStorage('cityList')
			},
			//处理数据返回的城市id
			addressSelect() {
				let str = String(this.userDetails.CityID).split('');
				return [
					str[0] + str[1] + '0000',
					str[0] + str[1] + str[2] + str[3] + '00',
					String(this.userDetails.CityID)
				]
			}
		},
		methods: {
			//模拟点击上传控件
			file() {
				this.$refs.file.click();
			},
			//图片压缩并且转成base64字符串
			fileChange(e) {
				lrz(e.target.files[0], {
					width: 200,
					height: 200,
					quality: 0.3
				}).then((res) => {
					this.userDetails.HeaderPhoto = res.base64;
				})
			},
			//获取用户信息
			getUserDetails() {
				this.$common.ajax({
					result: true,
					data: {
						header: {
							action: 'GetUserInfo',
						},
						body: {
							userid: this.$common.getLocalStorage('user').userid
						}
					},
					success: (res) => {
						this.userDetails = res;
					}
				})
			},
			//提交表单
			setUserDetails() {
				this.$vux.confirm.show({
					title: '提示',
					content: '确认提交信息？',
					onConfirm: () => {
						let obj = JSON.parse(JSON.stringify(this.userDetails));
						obj.userid = obj.ID
						obj.CityID = this.$refs.addressSelect.currentValue[2];
						if(obj.HeaderPhoto.indexOf('http') >= 0) {
							delete obj.HeaderPhoto
						} else {
							obj.HeaderPhoto = obj.HeaderPhoto.split(',')[1]
						}
						this.$common.ajax({
							data: {
								header: {
									action: 'EditUserInfo',
								},
								body: obj
							},
							success: (res) => {
								localStorage.setItem('userPic', this.userDetails.HeaderPhoto);
								this.$vux.toast.show({
									text: '修改成功',
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
			this.getUserDetails();

		},
		components: {
			Cell,
			Group,
			XInput,
			XAddress,
			XTextarea,
			Selector,
			PopupPicker,
			XHeader,
			Popup
		}
	}
</script>

<style lang="less">
	.view-user-edit-data {
		.img-box {
			position: relative;
		}
		.pic-input {
			top: 0px;
			position: absolute;
			width: 100%;
			height: 100%;
			opacity: 0;
			z-index: 3;
			left: 0px;
		}
		.pic-img {
			position: absolute;
			display: inline-block;
			width: 120px;
			height: 120px;
			overflow: hidden;
			border-radius: 100%;
			right: 80px;
			top: 10px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.weui-cell {
			padding: 40px 40px;
			label {
				width: 200px;
				font-size: 42px;
			}
			input {
				height: auto;
				text-align: right;
				&[disabled] {
					-webkit-text-fill-color: #acacac;
				}
			}
			.weui-cell__ft {
				font-size: 42px;
			}
			&.medical-history {
				input[disabled] {
					-webkit-text-fill-color: #000;
					width: 85%;
					float: right;
				}
			}
			&.address {
				input {
					-webkit-text-fill-color: #000;
				}
			}
			
		}
		.weui-cell_select-after {
			padding: 40px 40px!important;
		}
		.vux-popup-picker-value {
			font-size: 42px;
			margin-right: 40px;
		}
		.vux-popup-dialog {
			background: #fff;
		}
		.vux-x-textarea {
			font-size: 42px;
		}
	}
</style>