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
              <div v-if='stateIsError'
                class="circle circle-error">异常</div>
              <div v-else
                class="circle">正常</div>
            </grid-item>
            <grid-item class='text-item'
              style='width:70%;'>
              <p>测量时间：{{currentTime}} <br /> 测量血糖：{{currentValue}}
                <span>mmol</span>
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
            <span>
              <i></i>异常
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
      type: "500",
      columns: [
        {
          title: "状态",
          key: "MeterTime",
          width: 100,
          align: "center",
          render: (h, params) => {
            var isError = this.getState(params.row.MeterValue);
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: isError ? "red" : "green"
                  },
                  on: {}
                },
                isError ? "异常" : "正常"
              )
            ]);
          }
        },
        {
          title: "血糖",
          align: "center",
          key: "MeterValue"
        },
        {
          title: "时间",
          key: "MeterTime",
          align: "center",
          width: 200
        }
      ]
    };
  },
  computed: {
    
  },
  mounted() {},
  methods: {
    getPieDataRender(res) {
      this.chartPieOption.series[0].data = [
            { value: res.nomal, name: "正常" },
            { value: res.notnomal, name: "异常" }
          ];
    },
    getDataRender(res) {
      let data = res.data;
      this.healthWarn = {
        max: res.max,
        min: res.min
      };
      this.chartLineOption.yAxis.max = 20;
      this.chartLineOption.yAxis.min = 0;
      this.chartLineOption.xAxis.data = data.map(t => {
        return t.MeterTime;
      });
      this.chartLineOption.legend.data = ["血糖"];
      this.chartLineOption.series = [
        {
          name: "血糖",
          type: "line",
          data: data.map(t => {
            return {
              value: t.MeterValue,
              itemStyle: {
                normal: {
                  color: (() => {
                    if (
                      t.MeterValue > this.healthWarn.max ||
                      t.MeterValue < this.healthWarn.min
                    ) {
                      return "red";
                    }
                  })()
                }
              }
            };
          })
        }
      ];
    },
    getHealthWarn() {
      return this.$ajax({
        data: {
          header: {
            action: "GetHealthWarnSettingNew"
          },
          body: {
            userid: this.userId,
            datatype: 500
          }
        },
        success: res => {
          this.healthWarn = {
            max: res.MaxValue,
            min: res.MinValue
          };
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "~assets/less/Charts.less"; 
</style>
