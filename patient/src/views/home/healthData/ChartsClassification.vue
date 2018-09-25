
<template>
  <div class="health-warn">
    <div class='content'>
      <div class="item" :class='t.class' v-for='(t,i) in list' :key='i'>
        <router-link :to="{path:'/Charts'+t.type}">
          <div class="title">
            {{t.name}}<span>（{{t.unit}}）</span>
          </div>
          <i class="fa" :class='t.iconClass'
            aria-hidden="true"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "healthWarnContent",
  data() {
    return {
      list: [
        {
          name: "体温",
          unit: "℃",
          type: "101",
          class: "temperature",
          iconClass: "fa-thermometer"
        },
        {
          name: "血压",
          unit: "mmHg",
          type: "200",
          class: "diastolic-pressure",
          iconClass: "fa-heartbeat"
        },
        {
          name: "血氧",
          unit: "mmHg",
          type: "300",
          class: "oxygen",
          iconClass: "fa-eercast"
        },
        {
          name: "心率",
          unit: "BMP",
          type: "401",
          class: "heart-rate",
          iconClass: "fa-stethoscope"
        },
        {
          name: "空腹血糖",
          unit: "mmol",
          type: "500",
          class: "fasting-blood-glucose",
          iconClass: "fa-tint"
        },
        {
          name: "餐后血糖",
          unit: "mmol",
          type: "501",
          class: "postprandial-blood-glucose",
          iconClass: "fa-tint"
        },
        {
          name: "心电图",
          unit: "BMP",
          type: "900",
          class: "ecg",
          iconClass: "fa-heart"
        },
      ]
    };
  },
  props: {},
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.health-warn {
  background: #fff;
  padding-top: 110px;
  padding-bottom:20px;
  .content {
    margin: 0px 20px;
    .item {
      box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
      color: #fff;
      position: relative;
      width: 100%;
      height: 300px;
      line-height: 300px;
      background: #000;
      border-radius: 30px;
      margin: 20px 0px;
      a{
        color:#fff;
      }
      .title {
        font-size: 52px;
        font-weight: 400;
        text-align: left;
        
      padding-left:70px;
        span {
          font-size: 42px;
        }
      }

      p {
        font-size: 14px;
        span {
          margin-right: 10px;
        }
      }
      i {
        color: #fff;
        position: absolute;
        right: 70px;
        top: 50%;
        font-size: 100px;
        transform: translateY(-50%);
        // opacity: 0.7;
      }
      &.temperature {
        background: #00bcd4cc;
      }
      &.diastolic-pressure {
        background: #9c27b0d1;
      }
      &.systolic-pressure {
        background: #673ab7d1;
      }
      &.oxygen {
        background: #4caf50d6;
      }
      &.heart-rate {
        background: #f44336d6;
      }
      &.fasting-blood-glucose {
        background: #ff9900d9;
      }
      &.postprandial-blood-glucose {
        background: #ff5722d6;
      }
      &.ecg {
        background: #fb4f24;
        i{
          font-size: 70px;
        }
      }
    }
  }
}
</style>
