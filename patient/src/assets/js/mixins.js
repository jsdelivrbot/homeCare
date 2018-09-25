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
          if (opt.parent) {
            obj.parent = opt.parent;
          }
          this.cityList.push(obj);
          if (t.datas) {
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
        if (this.$refs.dateTime) {
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
              if (res.length > 0) {
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
        if (opt && opt.page) {
          this.ajaxData.body.pageindex = opt.page;
          this.ajaxData.body.pagesize = this.total
        } else {
          this.page = 1;
          this.ajaxData.body.pageindex = this.page;
          this.ajaxData.body.pagesize = this.total
        }
        this.$ajax({
          data: this.ajaxData,
          success: (res) => {
            if (opt && opt.render) {
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
            if (opt.type == 'startTime') {
              let start = new Date(val).getTime()
              let end = new Date(this.endTime).getTime()
              if (start > end) {
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
              if (start > end) {
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
        details: {}
      }
    },
    methods: {
      onCancel() {
        this.applyText = '';
      },
      onConfirm() {
        this.$vux.loading.show({
          text: '加载中'
         });
        this.$ajax({
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
  },
  //图表
  charts: {
    data() {
      return {
        stateIsError: false, //当前选择的数据状态是否是异常
        currentTime: "--", //当前选择的数据时间
        currentValue: "--", //当前选择的数据值
        currentValue2: "--", //当前选择的数据值2
        healthWarn: {}, //预设的数据预警上限下限
        healthWarn2: {}, //预设的数据预警上限下限2
        swiperHeight: "0px", //swiper翻页的高度
        tabsIndex: 0, //当前栏目的index
        tabsSelected: "trendMap", //当前栏目的id
        tabsList: [{ //栏目列表
            id: "trendMap",
            label: "趋势图"
          },
          {
            id: "list",
            label: "列表"
          },
          {
            id: "statistics",
            label: "统计"
          }
        ],
        buttonTabsSelectedValue: 3, //按钮tabs的value
        buttonTabsList: [{ //按钮tabs列表
            label: "三天",
            value: 3
          },
          {
            label: "七天",
            value: 7
          },
          {
            label: "三十天",
            value: 30
          }
        ],
        tableList: [], //表格列表
        tableLoading: false, //表格loading
        chartLineOption: { //折线图默认配置
          tooltip: {
            trigger: "axis",
            textStyle: {
              align: "left"
            }
          },
          grid: {
            bottom: "19%",
            left: "12%",
            right: "7%",
            top: "10%"
          },
          legend: {
            data: [],
            icon: "rect",
            itemWidth: 25,
            itemHeight: 5,
            bottom: 10,
            right: "7%"
          },
          // dataZoom:{
          //   type: 'inside',
          //   realtime: true,
          //   start: 0,
          //   end: 100,
          // },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [],
            axisLabel: {
              show: false,
              formatter: function (params) {
                return params.replace(" ", "\n");
              }
            }
          },
          yAxis: {
            type: "value"
          },

          series: []
        },
        chartPieOption: { //饼图默认配置
          color: ['#05be03', 'red'],
          title: {
            text: '30天状态比例统计图',
            x: 'center'
          },
          grid: {
            top: '20%',
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            top: '5%',
            data: ['正常', '异常']
          },
          series: [{
            name: '状态',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]

        }
      }
    },
    computed: {
      //用户id
      userId() {
        if (this.idCard == "") {
          return this.$common.getLocalStorage("user") && this.$common.getLocalStorage("user").userid
        } else {
          return ''
        }
      },
      //用户身份证
      idCard() {
        return this.$common.getUrlParams('idCard')
      }


    },
    mounted() {
      this.$nextTick(() => {
        window.scrollTo(0, 0);
        this.tabsHandler(this.tabsList[0]);
        this.setSwiperHeight();
        if (this.type == 900) {
          return false;
        }
        document.querySelector(".vux-button-tab-item-first").click();
      });
    },
    methods: {
      //设置swiper高度为屏幕高度
      setSwiperHeight() {
        this.swiperHeight =
          document.querySelector("body").clientHeight -
          document.querySelector(".vux-tab-wrap").clientHeight - document.querySelector(".vux-header-title").clientHeight;
      },
      //swiper切换回调
      swiperHandler(currentIndex) {
        this.tabsSelected = this.tabsList[currentIndex].id;
        if (this.tabsList[currentIndex].id == 'list') {
          this.getTableData();
        }
        if (this.tabsList[currentIndex].id == 'statistics') {
          this.getPieData();
        }
      },
      //tabs切换回调
      tabsHandler(item) {
        this.tabsSelected = item.id;
      },
      //buttonTabs切换回调
      buttonTabHandler(item) {
        this.buttonTabsSelectedValue = item.value;
        this.getData();
      },
      //获取表格数据
      getTableData() {
        this.tableLoading = true;
        this.$ajax({
          data: {
            header: {
              action: "GetHealthDataNew"
            },
            body: {
              userid: this.userId,
              idcard: this.idCard,
              datatype: this.type,
              days: 30
            }
          },
          success: res => {
            this.tableLoading = false;
            if (this.type == 900) {
              this.tableList = res;
            } else {
              this.tableList = res.data;
            }

          }
        });
      },
      //获取折线图数据
      getData() {
        this.$refs['chartLine'].showLoading({
          text: '加载中',
        });
        this.$ajax({
          data: {
            header: {
              action: "GetHealthDataNew"
            },
            body: {
              userid: this.userId,
              idcard: this.idCard,
              datatype: this.type,
              days: this.buttonTabsSelectedValue
            }
          },
          success: res => {
            this.$refs['chartLine'].hideLoading();
            if (res.data.length > 0) {
              this.getDataRender(res);
            } else {
              this.$vux.toast.text("没有数据");
            }
          }
        });
      },
      //判断值是不是正常。传入当前值与预警值上限，下限做对比。
      getState(value) {
        return value > this.healthWarn.max || value < this.healthWarn.min ?
          true :
          false;
      },
      //设置当前值，当前时间;
      chartLineChange(item) {
        this.currentValue = item.value;
        this.currentTime = item.name;
        this.stateIsError = this.getState(this.currentValue)
      },
      //获取饼图数据
      getPieData() {
        this.$refs['chartPie'].showLoading({
          text: '加载中',
        });
        this.$ajax({
          data: {
            header: {
              action: "MeasuredData"
            },
            body: {
              userid: this.userId,
              datatype: this.type,
              idcard: this.idCard,
              days: 30
            }
          },
          success: res => {
            this.$refs['chartPie'].hideLoading();
            //正常/异常数据都为空时，不显示扇形图，并且是血压的类型，不做处理，血压另外自己处理。
            if (res.nomal == 0 && res.notnomal == 0 && this.type != 200) {
              this.$vux.toast.text("没有数据可以统计");
              this.chartPieOption.series[0].data = [];
            } else {
              this.getPieDataRender(res);
            }

          }
        });
      }
    }
  },
}
