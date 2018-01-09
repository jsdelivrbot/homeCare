<template>
	<div class='view-track'>
		<div class="common-header-right">
			<a @click='$refs.memberFamily.show=true'>{{userName}}</a>
		</div>
		<!--<div class="btn-group" style='position: fixed;top:50px;z-index: 999;'>
			<x-button mini @click.native='lushu.start()' text='开始' type="primary"></x-button>
			<x-button mini @click.native='lushu.pause()' text='暂停' type="primary"></x-button>
			<x-button mini @click.native='lushu.stop()' text='重置' type="primary"></x-button>
		</div>-->
		<div id="map" ref='map'></div>
		<dateTime ref='dateTime' @on-change='getData'></dateTime>
		<memberFamily ref='memberFamily' @on-hide='memberFamilyChange'></memberFamily>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	import dateTime from 'components/dateTime'
	import memberFamily from 'components/memberFamily.vue'
	export default {
		name: 'trackView',
		data() {
			return {
				userName: '家庭成员', //用户名称
				memberFamilyShow: false,
				userId: '', //用户id
				lushu: {}, //路书对象
				list: [] //坐标点

			}
		},
		computed: {
			//处理过的坐标点
			pointList() {
				return this.list.map((t) => {
					return new BMap.Point(t.Lon, t.Lat)
				})
			}
		},
		methods: {
			memberFamilyChange(opt) {
				this.userId = opt.UserID;
				this.getData();
			},
			mapInit() {
				var map = new BMap.Map("map"); //创建地图实例
				var points = this.pointList; //设置坐标数组			
				var icon2 = new BMap.Icon('http://developer.baidu.com/map/jsdemo/img/Mario.png', new BMap.Size(30, 30), {
					anchor: new BMap.Size(15, 15)
				}); //动车
				var myIcon = new BMap.Icon("http://wxuser.homecare.xuhuicn.com/start-icon.png", new BMap.Size(30, 30));
				var myIcon1 = new BMap.Icon("http://wxuser.homecare.xuhuicn.com/end-icon.png", new BMap.Size(30, 30));
				var startIcon = new BMap.Marker(new BMap.Point(this.pointList[0].lng, this.pointList[0].lat), {
					icon: myIcon
				}); // 创建标注
				var stopIcon = new BMap.Marker(new BMap.Point(this.pointList[this.pointList.length - 1].lng, this.pointList[this.pointList.length - 1].lat), {
					icon: myIcon1
				});
				var polyline = new BMap.Polyline(points); //创建折线
				this.lushu = new BMapLib.LuShu(map, points, {
					landmarkPois: [], //显示的特殊点，似乎是必选参数，可以留空，据说要和距原线路10米内才会暂停，这里就用原线的点
					defaultContent: '马里奥，我们走！', //覆盖物内容，这个填上面的特殊点文字才会显示
					speed: 500, //路书速度
					icon: icon2, //覆盖物图标，默认是百度的红色地点标注
					autoView: true, //自动调整路线视野
					enableRotation: false, //覆盖物随路线走向
				});
				map.addOverlay(polyline); //覆盖折线到地图上
				map.addOverlay(startIcon);
				map.addOverlay(stopIcon);
				map.centerAndZoom(this.pointList[0], 19); //设置中心坐标及默认缩放级别
			},
			getData() {
				this.$common.ajax({
					result: true,
					data: {
						header: {
							action: 'GetGPSList',
						},
						body: {
							userid: this.userId,
							starttime: this.$refs.dateTime.startTime,
							endtime: this.$refs.dateTime.endTime
						}
					},
					success: (res) => {
						this.list = res;
						if(this.list.length > 0) {
							this.mapInit();
						} else {
							this.$vux.toast.show({
								text: '没有数据',
								type: 'cancel'
							});
							setTimeout(() => {
								var map = new BMap.Map("map"); //创建地图实例
								map.centerAndZoom(new BMap.Point(120.65, 28.01), 11);
							}, 500)
						}

					},
					error: (res) => {
						setTimeout(() => {
							var map = new BMap.Map("map"); //创建地图实例
							map.centerAndZoom(new BMap.Point(120.65, 28.01), 11);
						}, 500)
					}
				})
			},
		},
		mounted() {
			this.$refs.map.style.height = window.innerHeight + 'px'
			this.userId = this.$common.getLocalStorage('user').userid;
			this.getData();

		},

		components: {
			XHeader,
			dateTime,
			memberFamily
		}
	}
</script>

<style lang="less" scoped>
	.view-track {
		.common-date-time {
			position: absolute;
			width: 100%;
			bottom: 0px;
			/*background: url(/homeCare/patient/src/assets/images/add-real-name-msg.png);*/
		}
	}
</style>