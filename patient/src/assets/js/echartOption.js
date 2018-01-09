export default {
	//体温（护理仪）
	101(opt) {
		let option = {
			color: ['#00aeff'],
			dataZoom: [{
				show: false,
				type: 'inside',
				start: 0,
				end: 100
			}, {
				show: false,
				start: 0,
				end: 100,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '80%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}],
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				top: '5%',
				left: '5%',
				right: '5%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: [] //测量日期
			},
			yAxis: {
				min: 30,
				type: 'value',
				name: '(°C)',
				axisLabel: {
					formatter: '{value} '
				}
			},
			series: {
				name: '温度',
				type: 'line',
				stack: '总量',
				label: {
					normal: {
						show: true
					}

				},
				data: [] //测量数据
			}
		};
		option.xAxis.data = opt.map((t) => {
			return t.MeterTime
		});
		option.series.data = opt.map((t) => {
			return {
				value: t.MeterValue,
				itemStyle: {
					normal: {
						color: (function(){
							if(t.MeterValue>37){
								return 'red'
							}else if(t.MeterValue<36){
								return '#ff7600'
							}
						})()
					}

				}
			}
		});
		return option;
	},
	//血压
	200(opt) {
		let option = {
			color: ['#00aeff', '#04be02'],
			dataZoom: [{
				show: false,
				type: 'inside',
				start: 0,
				end: 100
			}, {
				show: false,
				start: 0,
				end: 100,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '80%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}],
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				top: '5%',
				left: '5%',
				right: '5%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: [] //测量日期
			},
			yAxis: {
				type: 'value',
				name: '(mmHg)',
				axisLabel: {
					formatter: '{value} '
				}
			},
			series: []
		}
		option.xAxis.data = opt.map((t) => {
			return t.MeterTime
		});
		option.series.push({
			name: '上压',
			type: 'line',

			label: {
				normal: {
					show: true
				}

			},
			data: opt.map((t) => {
				return t.SYS
			})
		});
		option.series.push({
			name: '下压',
			type: 'line',
			label: {
				normal: {
					show: true
				}

			},
			data: opt.map((t) => {
				return t.DIA
			}) 
		});

		return option;
	},
	//血氧
	300(opt) {
		let option = {
			color: ['#00aeff'],
			dataZoom: [{
				show: false,
				type: 'inside',
				start: 0,
				end: 100
			}, {
				show: false,
				start: 0,
				end: 100,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '80%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}],
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				top: '5%',
				left: '5%',
				right: '5%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: [] //测量日期
			},
			yAxis: {
				type: 'value',
				name: '(%)',
				axisLabel: {
					formatter: '{value}'
				}
			},
			series: {
				name: '血氧',
				type: 'line',
				stack: '总量',
				label: {
					normal: {
						show: true
					}

				},
				data: [] //测量数据
			}
		}
		option.xAxis.data = opt.map((t) => {
			return t.MeterTime
		});
		option.series.data = opt.map((t) => {
			return t.MeterValue
		});
		return option;
	},
	//心率
	401(opt) {
		let option = {
			color: ['#00aeff'],
			dataZoom: [{
				show: false,
				type: 'inside',
				start: 0,
				end: 100
			}, {
				show: false,
				start: 0,
				end: 100,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '80%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}],
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				top: '5%',
				left: '5%',
				right: '5%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: [] //测量日期
			},
			yAxis: {
				type: 'value',
				name: '(次/分钟)',
				axisLabel: {
					formatter: '{value}'
				}
			},
			series: {
				name: '心率',
				type: 'line',
				stack: '总量',
				label: {
					normal: {
						show: true
					}

				},
				data: [] //测量数据
			}
		}
		option.xAxis.data = opt.map((t) => {
			return t.MeterTime
		});
		option.series.data = opt.map((t) => {
			return t.MeterValue
		});
		return option;
	},
	//空腹血糖
	500(opt) {
		let option = {
			color: ['#00aeff'],
			dataZoom: [{
				show: false,
				type: 'inside',
				start: 0,
				end: 100
			}, {
				show: false,
				start: 0,
				end: 100,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '80%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}],
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				top: '5%',
				left: '5%',
				right: '5%',
				bottom: '5%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: [] //测量日期
			},
			yAxis: {
				type: 'value',
				name: '(mmol/l)',
				axisLabel: {
					formatter: '{value}'
				}
			},
			series: {
				name: '空腹血糖',
				type: 'line',
				stack: '总量',
				label: {
					normal: {
						show: true
					}

				},
				data: [] //测量数据
			}
		}
		option.xAxis.data = opt.map((t) => {
			return t.MeterTime
		});
		option.series.data = opt.map((t) => {
			return t.MeterValue
		});
		return option;
	},
	//心电图
	900(opt) {
		let data = opt.map((t) => {
			return t.EcgV
		});
		let option = {
			tooltip: {
				trigger: 'axis',
				position: function(pt) {
					return [pt[0], '10%'];
				},

			},
			title: {
				show: false,
				left: '10%',
				text: '心电图',
			},
			legend: {
				top: 'bottom',
				data: ['意向']
			},
			toolbox: {
				show: false,
				right: '10%',
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			visualMap: {
				show: false,
				pieces: []
			},
			dataZoom: [{
				show: false,
				type: 'inside',
				start: 0,
				end: 10
			}, {
				show: false,
				start: 0,
				end: 10,
				handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				handleSize: '80%',
				handleStyle: {
					color: '#fff',
					shadowBlur: 3,
					shadowColor: 'rgba(0, 0, 0, 0.6)',
					shadowOffsetX: 2,
					shadowOffsetY: 2
				}
			}],
			grid: {
				top: '-5%',
				left: '-35.5%',
				right: '0%',
				bottom: '-12%',
				containLabel: true,
				show: true,
				backgroundColor: '#000'
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: [], //测量日期
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				axisLine: {
					lineStyle: {
						opacity: 0
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						opacity: 0.4,
					}
				},
			},
			yAxis: {
				type: 'value',
				max: parseInt(Math.max.apply({}, data)) * 1.2, //数据中最大值的两倍
				//				splitNumber: parseInt(Math.max.apply({},data))*2,//数据中最大值的两倍
				axisLabel: {
					formatter: '{value}'
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				axisLine: {
					lineStyle: {
						opacity: 0
					}
				},
				splitLine: {
					show: true,
					lineStyle: {
						opacity: 0.4,
					}
				},
			},
			series: {
				name: '心率',
				type: 'line',
				label: {
					normal: {
						show: true
					}

				},
				symbol: 'none',
				lineStyle: {
					normal: {
						color: '#19d82f',
						width: 1
					}
				},
				data: data //测量数据
			}
		}
		option.xAxis.data = opt.map((t) => {
			return ''
		});
		return option;
	}

};