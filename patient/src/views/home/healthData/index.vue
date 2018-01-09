<template>
	<div class='view-health-data common-padding'>
		<div class="common-header-right">
			<a @click='$refs.memberFamily.show=true'>{{userName}}</a>
		</div>
		<div style="width: 100%;overflow:scroll;-webkit-overflow-scrolling:touch;">
			<tab style='width:800px' :line-width='5' active-color='#00aeff' v-model="tabIndex">
				<tab-item v-for="(t, i) in $common.healthDataType" @on-item-click="getData({type:i})" :key="i">{{t}}</tab-item>
			</tab>
		</div>
		<div class="common-no-data" v-if='!hasData'>没有更多数据</div>
		<chart ref='echart' :options="echartOption" auto-resize></chart>
		<!--<div class="legend">
			<ul>
				<li>
					<div class="rect rect-red"></div>
					偏高
				</li>
				<li>
					<div class="rect rect-blue"></div>
					正常
				</li>
				<li>
					<div class="rect rect-yellow" ></div>
					偏低
				</li>
			</ul>
		</div>-->
		<div class="ecg-list" v-if='ecgList.length>0'>
			<ul>
				<li v-for='t in ecgList' @click='getEcgData(t)'>
					<p>标题：{{t.ResultAnalyse}}</p>
					<p>时间：{{t.MeterTime}}</p>
				</li>
			</ul>
		</div>
		<div class="common-date-time" @click='showDateTime({type:"startTime",format:"YYYY-MM-DD"})'>
			<a>
				<span v-if='startTime==""'>
				<i  class='icon'></i>开始时间
			</span>
				<span v-else>{{startTime}}</span>
			</a>
		</div>
		<memberFamily ref='memberFamily' @on-hide='memberFamilyChange'></memberFamily>
		<x-dialog v-model='show' :hide-on-blur='true' :scroll='false' class='ecg-dialog' @on-hide='EcgDataStop'>
			<chart class='ecg-echart' ref='ecgEchart' :options="echartOption" auto-resize></chart>
		</x-dialog>
	</div>
</template>
<script>
	import { Tab, TabItem, XHeader, XDialog } from 'vux'
	import memberFamily from 'components/memberFamily.vue'
	import mixins from 'assets/js/mixins.js'
	import echartOption from 'assets/js/echartOption.js'
	var clearSetInterval;
	export default {
		name: 'healthData',
		mixins: [mixins.dateTime],
		data() {
			return {
				show: false, //ecg弹出框
				userName: '家庭成员', //用户名称
				userId: '', //用户id
				data: {}, //数据
				ecgList: [], //心电图列表
				type: '101', //数据类型
				tabIndex: 0, //tab选项，默认0
				echartOption: {},
				memberFamilyShow: false,
			}
		},
		computed: {
			hasData() {
				return this.data && this.data.length > 0 && this.data != "null" ? true : false
			}
		},
		watch: {
			startTime() {
				this.getData({
					type: this.type
				});
			}
		},
		methods: {
			//获取心电图数据
			getEcgData(opt) {
				this.show = true;
				this.$refs.ecgEchart.showLoading();
				this.$refs.echart.$el.style.zIndex = '-1'
				this.$common.ajax({
					loading: false,
					result: true,
					data: {
						header: {
							action: 'GetEEGData',
						},
						body: {
							eegid: opt.ECGid
						}
					},
					success: (res) => {
						this.$refs.ecgEchart.resize();
						this.$refs.ecgEchart.hideLoading();
						this.data = res;
						this.initEchart();
						this.EcgDataRun();

					}
				})
			},
			EcgDataRun() {
				clearSetInterval = setInterval(() => {
					if(this.echartOption.dataZoom[0].end <= 100) {
						this.echartOption.dataZoom[0].start += 1;
						this.echartOption.dataZoom[0].end += 1;
						this.$refs.ecgEchart.mergeOptions({
							dataZoom: [{
								start: this.echartOption.dataZoom[0].start,
								end: this.echartOption.dataZoom[0].end
							}]
						});
					} else {
						this.EcgDataStop();

					}
				}, 1000);
			},
			EcgDataStop() {
				clearInterval(clearSetInterval)
			},
			//获取数据
			getData(opt) {
				this.$refs.echart.$el.style.zIndex = '0'
				this.type = opt.type;
				this.$refs.echart.showLoading();
				this.$common.ajax({
					loading: false,
					result: true,
					data: {
						header: {
							action: 'GetHealthData',
						},
						body: {
							userid: this.userId,
							datatype: this.type,
							starttime: this.startTime,
							endtime: ''
						}
					},
					success: (res) => {
						this.$refs.echart.hideLoading();
						this.echartOption = {}; //清空图表；
						this.ecgList = []; //清空心电图列表；						
						if(this.type == 900) {
							this.ecgList = res;
						} else {
							this.data = res;
						}
						if(this.data.length > 0 && this.type != 900) {
							this.initEchart();
						}
					}
				})
			},
			//实例化图表
			initEchart() {
				this.echartOption = echartOption[this.type](this.data);

			},
			memberFamilyChange(opt) {
				this.userName = opt.RealName;
				this.userId = opt.UserID;
				this.getData({
					type: this.type
				});
			}
		},
		mounted() {
			this.userId =this.$route.query.userId||this.$common.getLocalStorage('user').userid;
			this.getData({
				type: this.type
			});
		},

		components: {
			Tab,
			TabItem,
			XHeader,
			memberFamily,
			XDialog
		}
	}
</script>

<style lang="less">
	.view-health-data {
		.legend {
			position: absolute;
			bottom: 150px;
			width: 100%;
			left: 100px;
			ul{
				li{
					float: left;
					margin-right: 30px;
					font-size:32px;
					.rect{
						margin-top: 5px;
						width: 50px;
						height: 40px;
						margin-right: 10px;
						float: left;
						&.rect-red{
							background: red;
						}
						&.rect-blue{
							background: @primary-color;
						}
						&.rect-yellow{
							background: #ff7600;
						}
					}
				}
			}
		}
		.vux-tab {
			background: #007ab3;
			padding: 40px 0px;
			.vux-tab-item {
				text-decoration: none;
				font-size: 42px;
				background: none;
				color: #a1c3dc;
				text-align: center;
				&.vux-tab-selected {
					color: #fff!important;
				}
			}
		}
		.echarts {
			width: 100%;
			height: 88%;
		}
		.ecg-echart {
			width: 100%;
		}
		.ecg-dialog {
			width: 100%;
			.weui-dialog {
				background-color: #000;
				width: 90%;
				max-width: 600px;
			}
			.echarts {
				width: 100%;
				height: 500px;
			}
			/*.weui-dialog{
				width: 100%;
				height: 200px;
			}*/
		}
		.ecg-list {
			position: absolute;
			top: 230px;
			width: 100%;
			padding-bottom: 100px;
			background: #fff;
			ul {
				li {
					padding: 40px;
					margin: 20px;
					border: 1px solid #DFDFDF;
					border-radius: 15px;
					font-size: 42px;
				}
			}
		}
		.common-date-time {
			position: fixed;
			width: 100%;
			bottom: 0px;
		}
		.no-data {
			margin-top: 50px;
			width: 100%;
			height: 100%;
			position: fixed;
			z-index: 999;
			text-align: center;
			font-size: 42px;
			background: #fff;
		}
	}
</style>