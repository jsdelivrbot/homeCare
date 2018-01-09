<template>
	<div class="putRecourse" @click='submitData'>
		<b>SOS</b>
	</div>
</template>

<script>
	import { dateFormat } from 'vux'
	export default {
		data() {
			return {
				hasLocation: true,//是否已经定位过了
				time: 20,//定位间隔时间
				location: {} //定位信息
			}
		},
		computed: {},
		methods: {
			//提交表单
			submitData() {
				this.hasLocation ? this.getLocation() : this.putRecourse(this.location);
			},
			//定位时间间隔处理
			timeRun() {
				var clear = setInterval(() => {
					if(this.time > 0) {
						this.time -= 1;
						this.hasLocation = false;
					} else {
						this.hasLocation = true;
						this.time = 20;
						clearInterval(clear)
					}
				}, 1000)
			},
			//获取定位
			getLocation() {
				this.$vux.loading.show({
					text: '定位中'
				})
				new BMap.Geolocation().getCurrentPosition((location) => {
					this.location = location;
					this.$vux.loading.hide();
					this.timeRun();
					this.putRecourse(location);
				})
			},
			//发起sos求助请求
			putRecourse(opt) {
				this.$vux.confirm.show({
					title: '提示',
					content: '确定要一键求助？',
					onConfirm: () => {
						this.$common.ajax({
							data: {
								header: {
									action: 'AddSOS',
								},
								body: {
									userid: this.$common.getLocalStorage('user').userid,
									Lon: opt.longitude,
									Lat: opt.latitude,
									MeterTime: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
								}
							},
							success: (res) => {
								this.$vux.toast.show({
									text: '求助成功',
									type: 'success'
								})
							}
						})
					}
				});
			}
		},
		mounted() {

		},
		components: {

		}
	}
</script>

<style lang="less" scoped>
	.putRecourse {
		width: 170px;
		height:170px;
		/*background-image: url(../assets/images/home_yjhj.png);
		background-size:contain;*/
		background: #ff7900;
		border-radius: 100%;
		z-index: 99999;
		position: fixed;
		bottom: 130px;
		right: 0px;
		text-align: center;
		b{
			font-size:52px;
			color:#fff;			
			line-height: 170px;
		}
	}
</style>