import cityData from 'assets/data/cityData.js' //三级联动数据js文件

export default {
	//城市选择数据
	city: {
		data() {
			return {
				cityList: [] //城市三级联动数据，来自数据库下载来的json文件
			}
		},
		methods: {
			//获取城市三级联动数据
			getCityList() {
				this.cityList = [];
				this.handleCityData({
					data: cityData
				});
				this.$common.setLocalStorage('cityList', this.cityList);
			},
			//处理城市数据
			handleCityData(opt) {
				opt.data.forEach((t) => {
					let obj = {
						name: t.Name,
						value: t.ID
					};
					if(opt.parent) {
						obj.parent = opt.parent;
					}
					this.cityList.push(obj);
					if(t.datas) {
						this.handleCityData({
							data: t.datas,
							parent: t.ID
						});
					}
				})
			}

		}
	},
	//上拉加载更多下拉刷新
	scroller: {
		data() {
			return {
				list: [],
				page: 0,
				total: 10
			}
		},
		computed: {},
		methods: {
			// 清空
			empty() {
				this.page = 1;
				if(this.$refs.dateTime) {
					this.$refs.dateTime.startTime = '';
					this.$refs.dateTime.endTime = '';
				}
			},
			//下拉刷新
			refresh(done) {
				this.empty();
				setTimeout(() => {
					this.getData({
						page: this.page,
						render: (res) => {
							this.list = res;
							done();
						}
					});
				}, 300)
			},
			//上拉加载
			infinite(done) {
				setTimeout(() => {
					this.getData({
						page: this.page += 1,
						render: (res) => {
							if(res.length > 0) {								
								this.list = [...this.list, ...res];
								done()
//								res.length < this.total ? done(true) : done()
							} else {
								done(true);
							}
						}
					})
				}, 300)
			},
			//获取数据
			getData(opt) {
				if(opt && opt.page) {
					this.ajaxData.body.pageindex = opt.page;
					this.ajaxData.body.pagesize = this.total
				} else {
					this.page = 1;
					this.ajaxData.body.pageindex = this.page;
					this.ajaxData.body.pagesize = this.total
				}
				this.$common.ajax({
					loading: false,
					result: true,
					data: this.ajaxData,
					success: (res) => {						
						if(opt && opt.render) {
							opt.render(res);
						} else {

							this.list = res;

						}
					}
				});
			}
		}
	},
	//日期时间选择
	dateTime: {
		data() {
			return {
				startTime: '',
				endTime: ''
			}
		},
		computed: {},
		methods: {
			showDateTime(opt) {
				this.$vux.datetime.show({
					cancelText: '取消',
					confirmText: '确定',
					clearText: opt.type == 'startTime' ? '开始时间' : '结束时间',
					format: opt.format || 'YYYY-MM-DD HH:mm',
					value: this[opt.type],
					onConfirm: (val) => {
						if(opt.type == 'startTime') {
							let start = new Date(val).getTime()
							let end = new Date(this.endTime).getTime()
							if(start > end) {
								this.$vux.toast.show({
									text: '开始时间不能大于结束时间',
									type: 'cancel'
								});
							} else {
								this[opt.type] = val;
								this.$emit('on-change');
							}

						} else {
							let start = new Date(this.startTime).getTime()
							let end = new Date(val).getTime()
							if(start > end) {
								this.$vux.toast.show({
									text: '开始时间不能大于结束时间',
									type: 'cancel'
								});
							} else {
								this[opt.type] = val;
								this.$emit('on-change');
							}
						}
					}
				})
			}
		}
	},
	//家庭成员关注
	addConcernApply: {
		data() {
			return {
				confirm: false,
				applyText: '', //关注请求备注
				list: [], //查询到的用户信息
				details:{}
			}
		},
		methods: {
			onCancel() {
				this.applyText = '';
			},
			onConfirm() {
				this.$common.ajax({
					data: {
						header: {
							action: 'AddConcernApply',
						},
						body: {
							FromUserID: this.$common.getLocalStorage('user').userid,
							ToUserID: this.details.ID,
							ApplyText: this.applyText
						}
					},
					success: (res) => {
						this.applyText = '';
						this.$vux.toast.show({
							text: '关注请求已发送！',
						})
					}
				})
			}
		}
	}
}