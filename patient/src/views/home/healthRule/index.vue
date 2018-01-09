<template>
	<div class='view-health-rule'>
		<template v-for='(t,i) in list'>
				<x-input  :title="$common.warnDataType[t.DataType]+'(上限)'" type="tel" v-model='t.MaxValue' disabled></x-input>
				<x-input  :title="$common.warnDataType[t.DataType]+'(下限)'" type="tel" v-model='t.MinValue' disabled></x-input>
		</template>
		<confirm v-model="confirm" title="备注" @on-confirm="submitData">
			<x-textarea v-model='remarks' placeholder="请输入备注" :rows='4'></x-textarea>
		</confirm>
	</div>
</template>

<script>
	import { Group, Cell, XHeader, XInput, Confirm, XTextarea } from 'vux'

	export default {
		name:'healthRule',
		data() {
			return {
				a:'1',
				confirm: false,
				remarks: '',
				list: []
			}
		},
		methods: {
			submitData() {
				this.$common.ajax({
					data: {
						header: {
							action: 'EditHealthWarnSetting',
						},
						body: {
							UserID: this.$common.getLocalStorage('user').userid,
							DoctorID: '',
							Remark: this.remarks,
							Datas: this.list
						}
					},
					success: (res) => {
						this.$vux.toast.show({
							text: '修改成功'
						});
					}
				})
			},
			getData() {
				this.$common.ajax({
					result: true,
					data: {
						header: {
							action: 'GetHealthWarnSetting',
						},
						body: {
							UserID: this.$common.getLocalStorage('user').userid
						}
					},
					success: (res) => {
						this.list = res;
					}
				})
			}
		},
		mounted() {
			this.getData();
		},

		components: {
			Group,
			Cell,
			XHeader,
			XInput,
			Confirm,
			XTextarea
		}
	}
</script>

<style lang="less">
	.view-health-rule {
		background: #fff;
		padding-top: 110px;
			.weui-label{
				font-size:42px;
			}
			.weui-cell__bd{
				input{
					text-align: right;
				}
				
			}
			.weui-cell {
				padding: 15px 40px;
				padding-right: 0;
				.vux-label {
					font-size: 42px;
				}
			}
			.weui-cell__ft {
				font-size: 42px;
				margin-right: 10px;
				padding-right: 50px;
			}
		
	}
</style>