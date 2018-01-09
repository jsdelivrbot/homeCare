<template>
	<div class='view-health-rule'>
		<div class="common-header-right" @click='confirm=true'>修改</div>
			<template v-for='(t,i) in list'>
				<x-input :max='6'  :title="$common.warnDataType[t.DataType]+'(上限)'" type="tel" v-model='t.MaxValue'></x-input>
				<x-input :max='6'  :title="$common.warnDataType[t.DataType]+'(下限)'" type="tel" v-model='t.MinValue'></x-input>
			</template>
		<confirm v-model="confirm" title="备注" @on-confirm="submitData">
			<x-textarea v-model='remarks' placeholder="请输入备注" :rows='4'></x-textarea>
		</confirm>
	</div>
</template>
<script>
	import { Group, Cell, XHeader, XInput, Confirm, XTextarea } from 'vux'

	export default {
		data() {
			return {
				confirm: false,
				remarks: '',
				list: []
			}
		},
		methods: {
			
			submitData() {
				let reg=/^[0-9]+\.{0,1}[0-9]{0,2}$/; //只能输入数字和小数点
				for(let i=0;i<this.list.length;i++){
					if(this.list[i].MinValue>this.list[i].MaxValue){
						this.$vux.toast.show({
							text: this.$common.warnDataType[this.list[i].DataType]+'（下限）不能大于（上限）',
							type: 'cancel'
						});
						return false;
					}
					if(!reg.exec(this.list[i].MinValue)){
						this.list[i].MinValue='';
						this.$vux.toast.show({
							text: this.$common.warnDataType[this.list[i].DataType]+'（下限）只能输入数字',
							type: 'cancel'
						});
						return false;
					}
					if(!reg.exec(this.list[i].MaxValue)){
						this.list[i].MaxValue='';
						this.$vux.toast.show({
							text: this.$common.warnDataType[this.list[i].DataType]+'（上限）只能输入数字',
							type: 'cancel'
						});
						return false;
					}
				}				
				this.$common.ajax({
					data: {
						header: {
							action: 'EditHealthWarnSetting',
						},
						body: {
							UserID: this.$route.query.userId,
							DoctorID: this.$common.getLocalStorage('user').doctorid,
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
							UserID: this.$route.query.userId
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