<template>
  <div class="view-common-chart view-ecg">
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
      <!-- <div class='ecg-list'>
      <router-link :to="{path:'/ecgContent',query:{id:t.ECGid}}" v-for='(t,i) in list' :key='i'>
        <div class="item">
          <div class="img">
            <img src="@/assets/images/ecg.png"
              alt="">
          </div>
          <div class="text">
            <p>测量结果：{{t.ResultAnalyse}}</p>
            <p>测量时间：{{t.MeterTime}}</p>
          </div>

        </div>
      </router-link>

    </div> -->

      <swiper-item>
        <!-- <button-tab class="button-tab-box">
          <button-tab-item v-for='(t,i) in buttonTabsList'
            :key='i'
            @on-item-click='buttonTabHandler(t)'>{{t.label}}</button-tab-item>
        </button-tab> -->
        <div class='table-box'>
          <Table border
            :height="swiperHeight-20"
            :loading='tableLoading'
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
      type:'900', 
      tabsSelected: "list",
      tabsList: [
        {
          id: "list",
          label: "列表"
        },
        {
          id: "statistics",
          label: "统计"
        }
      ], 
      columns: [
        {
          title: "时间",
          key: "MeterTime",
          width: 150,
           render: (h, params) => {           
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color:  params.row.WarnResult=='正常'?'':'red'
                  }
                },
                params.row.MeterTime
              )
            ]);
          }
        },
        {
          title: "结果",
          key: "WarnResult",
          render: (h, params) => {           
            return h("div", [
              h(
                "span",
                {
                  style: {
                    color:  params.row.WarnResult=='正常'?'':'red'
                  }
                },
                params.row.WarnResult
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            let hasEcgImage = params.row.EcgImage != "" ? true : false;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type:  params.row.WarnResult=='正常'?'primary':'error',
                    size: "small",
                    disabled: !hasEcgImage
                  },
                  on: {
                    click: () => {
                      this.showEcg(params.row);
                    }
                  }
                },
                hasEcgImage ? "查看" : "渲染中"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {
  
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    showEcg(row) {
      this.$router.push({
        path: "/Charts900Content",
        query: { id: row.ECGid, ecgImage: row.EcgImage }
      });
    }, 
    getPieDataRender(res) {
       this.chartPieOption.series[0].data = [
            { value: res.nomal, name: "正常" },
            { value: res.notnomal, name: "异常" }
          ];
    }
  }
};
</script>

<style lang="less">
@import "~assets/less/Charts.less"; 
.view-ecg {
  .ecg-list {
    margin: 10px;
    .item {
      background: #fff;
      border: 1px solid #dfdfdf;
      border-radius: 15px;
      margin-top: 10px;
      .img {
        width: 100%;
        padding: 10px;
        height: 110px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        border-top: 1px solid #dfdfdf;
        padding: 10px;
        text-align: left;
        font-size: 14px;
      }
    }
  }
  td.error {
    color: red;
  }
}
</style>
