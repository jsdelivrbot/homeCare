<template>
  <div class='view-common-chart blood-pressure-chart'>
    <tab v-model="tabsIndex"
      :animate='false'>
      <tab-item :selected="tabsSelected === t.id"
        v-for="(t, i) in tabsList"
        :key="i"
        @on-item-click="tabsHandler(t)">{{t.label}}</tab-item>
    </tab>
    <swiper v-model="tabsIndex"
      :style='{height:swiperHeight+"px"}'
      :show-dots="false"
      @on-index-change='swiperHandler'>
      <swiper-item class='trend-map'>
        <button-tab class="button-tab-box">
          <button-tab-item v-for='(t,i) in buttonTabsList'
            :key='i'
            @on-item-click='buttonTabHandler(t)'>{{t.label}}</button-tab-item>
        </button-tab>
        <div class="content-box">
          <grid :show-lr-borders="false"
            :show-vertical-dividers="false">
            <grid-item class="circle-item">
              <div v-if='currentState==t.value'
                v-for='(t,i) in currentStateList'
                :key='i'
                class="circle"
                :style='{background:`${t.color}`}'>
                {{t.label}}
              </div>
              <!-- <div v-if='stateIsError'
                class="circle circle-error">异常</div>
              <div v-else
                class="circle">正常</div> -->
            </grid-item>
            <grid-item class='text-item'
              style='width:70%;'>
              <p>测量时间：{{currentTime}} <br /> 收缩压值：{{currentValue}}
                <br /> 舒张压值：{{currentValue2}}
              </p>
            </grid-item>

          </grid>
        </div>
        <div class="charts-box">
          <chart ref='chartLine'
            :options="chartLineOption"
            theme="my-theme"
            @click='chartLineChange'></chart>
          <div class="explain">
            <span v-for='(t,i) in currentStateList'>
              <i :style='{"border-color":t.color}'></i>{{t.label}}
            </span>
          </div>
        </div>
      </swiper-item>
      <swiper-item>
        <div class='table-box'>
          <Table border
            :loading='tableLoading'
            :height="swiperHeight-20"
            :columns="columns"
            :data="tableList"></Table>
        </div>
      </swiper-item>
      <swiper-item>
        <div class='chart-pie-box'>
          <chart ref='chartPie'
            :options="chartPieOption"></chart>
        </div>
      </swiper-item>
    </swiper>
  </div>

</template>

<script>
import mixins from "@/assets/js/mixins.js";
export default {
  mixins: [mixins.charts],
  data() {
    return {
      currentStateList: [
        { value: 1, label: "理想血压", color: "#1dc615" },
        { value: 2, label: "正常血压", color: "#15c680" },
        { value: 3, label: "正常高值", color: "#14aeca" },
        { value: 4, label: "1级高血压", color: "#3161e9" },
        { value: 5, label: "2级高血压", color: "#df3854" },
        { value: 6, label: "3级高血压", color: "#ff7900" }
      ],
      currentState: 2,
      type: "200",
      columns: [
        {
          title: "状态",
          key: "MeterTime",
          width: 120,
          align: "center",
          render: (h, params) => {
            let color, label;

            this.currentStateList.forEach(t => {
              if (t.value == params.row.grade) {
                color = t.color;
                label = t.label;
              }
            });
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color
                  },
                  on: {}
                },
                label
              )
            ]);
          }
        },

        {
          title: "收缩压",
          align: "center",
          key: "SYS"
        },
        {
          title: "舒张压",
          align: "center",
          key: "DIA"
        },
        {
          title: "时间",
          key: "MeterTime",
          align: "center",
          width: 105
        }
      ],
      lineList: []
    };
  },
  computed: {
    // stateIsError() {
    //   if (this.currentValue == "--") {
    //     return false;
    //   }
    //   if (
    //     this.currentValue > this.healthWarn2.max ||
    //     this.currentValue < this.healthWarn2.min
    //   ) {
    //     return true;
    //   }
    //   if (
    //     this.currentValue2 > this.healthWarn.max ||
    //     this.currentValue2 < this.healthWarn.min
    //   ) {
    //     return true;
    //   }
    //   return false;
    // }
  },
  mounted() {},
  methods: {
    chartLineChange(item) {
      var obj = this.lineList[item.dataIndex];
      this.currentValue = obj.SYS;
      this.currentValue2 = obj.DIA;
      this.currentState = obj.grade;
      this.currentTime = obj.MeterTime;
    },
    getPieDataRender(res) {
      if(res.nomal1==0&&res.nomal2==0&&res.nomal3==0&&res.nomal4==0&&res.nomal5==0&&res.nomal6==0){
         this.$vux.toast.text("没有数据可以统计");
          return false;
      }
      let color = this.currentStateList.map(t => {
        return t.color;
      });
      let legend = this.currentStateList.map(t => {
        return t.label;
      });
      let series = this.currentStateList.map(t => {
        return {
          value: res[`nomal${t.value}`],
          name: t.label
        };
      });
      this.chartPieOption.color = color;
      this.chartPieOption.legend.data = legend;
      this.chartPieOption.series[0].data = series;
    },
    getDataRender(res) {
      this.lineList = res.data;
      let data = res.data;
      this.healthWarn = {
        max: res.diamax,
        min: res.diamin
      };
      this.healthWarn2 = {
        max: res.sysmax,
        min: res.sysmin
      };
      this.chartLineOption.yAxis.max = 200;
      this.chartLineOption.yAxis.min = 30;
      this.chartLineOption.legend.data = ["收缩压", "舒张压"];
      this.chartLineOption.series = [
        {
          name: "收缩压",
          type: "line",
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          data: data.map(t => {
            return {
              value: t.SYS,
              itemStyle: {
                normal: {
                  color: (() => {
                    let color;
                    this.currentStateList.forEach(tt => {
                      if (tt.value == t.grade) {
                        color = tt.color;
                      }
                    });
                    return color;
                  })()
                }
              }
            };
          })
        },
        {
          name: "舒张压",
          type: "line",
          label: {
            normal: {
              show: true,
              position: "top"
            }
          },
          data: data.map(t => {
            return {
              value: t.DIA,
              itemStyle: {
                normal: {
                  color: (() => {
                    let color;
                    this.currentStateList.forEach(tt => {
                      if (tt.value == t.grade) {
                        color = tt.color;
                      }
                    });
                    return color;
                  })()
                }
              }
            };
          })
        }
      ];
      this.chartLineOption.xAxis.data = data.map(t => {
        return t.MeterTime;
      });
    }
  }
};
</script>

<style lang="less">
@import "~assets/less/Charts.less"; 
.blood-pressure-chart {
  .circle {
    font-size: 32px !important;
  }
}
</style>
