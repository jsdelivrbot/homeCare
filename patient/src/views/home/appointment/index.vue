<template>
	<div class='view-appointment'>
		<div class="common-header-right">
			<img class='img-btn'
			    src="~assets/images/common-menu.png" />
			<router-link :to="{path:'/homeRouterView/hospital'}">预约</router-link>
		</div>
		<scroller ref='scroller'
		    class='common-scroller'
		    :on-refresh="refresh"
		    :on-infinite="infinite">
			<spinner type="lines"
			    slot="refresh-spinner"></spinner>
			<spinner type="dots"
			    slot="infinite-spinner"></spinner>
			<div class="list">
				<ul class="clearfix">
					<li v-for='(t,i) in list'>
						<div class="img">
							<img :src="t.DoctorHeaderPhoto" />
						</div>
						<div class="text">
							<h1>{{t.DoctorName}}
								<span>{{t.DepartName}}</span>
							</h1>
							<p>{{t.AgencyName}}</p>
							<p class='time'>就诊时间：{{t.AppointVisitTime}}</p>
						</div>
						<div class="bottom"
						    v-if='t.StateID==0'
						    @click='deleteAppointment(t,i)'>取消签约</div>
						<div class="state"
						    :class='state[t.StateID]'></div>
					</li>
				</ul>
			</div>
		</scroller>
		<popup-picker class='visit-state'
		    :data="visitState"
		    :columns="3"
		    v-model="visitValue"
		    @on-hide='getData'></popup-picker>
	</div>
</template>
<script>
import mixins from "assets/js/mixins.js";
export default {
  name: "appointment",
  mixins: [mixins.scroller],
  data() {
    return {
      state: {
        0: "warn", //未就诊
        1: "success", //已就诊
        2: "overdue", //过期
        3: "cancel" //已取消
      },
      visitState: [
        {
          name: "全部",
          value: ""
        },
        {
          name: "未就诊",
          value: 0
        },
        {
          name: "已就诊",
          value: 1
        },
        {
          name: "过期",
          value: 2
        },
        {
          name: "已取消",
          value: 3
        }
      ],
      visitValue: []
    };
  },
  computed: {
    ajaxData() {
      return {
        header: {
          action: "GetAppointmentList"
        },
        body: {
          UserID: this.$common.getLocalStorage("user").userid,
          State: this.visitValue[0]
        }
      };
    }
  },
  methods: {
    //取消预约
    deleteAppointment(opt, index) {
      this.$vux.confirm.show({
        title: "提示",
        content: "确认取消预约？",
        onConfirm: () => {
          this.$vux.loading.show({
            text: "加载中"
          });
          this.$ajax({
            data: {
              header: {
                action: "DeleteAppointment"
              },
              body: {
                AppointmentID: opt.ID
              }
            },
            success: res => {
              this.list.splice(index, 1);
            }
          });
        }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.view-appointment {
  height: 100%;
  background: #fff;
  .common-header-right {
    .img-btn {
      position: absolute;
      right: 120px;
    }
  }
  .visit-state {
    right: 120px;
    position: fixed;
    width: 150px;
    height: 100px;
    z-index: 999;
    .weui-cell_access:active {
      background: none;
    }
    .weui-cell {
      height: 100px;
      .weui-cell__ft {
        display: none;
      }
    }
    .vux-popup-picker-select {
      display: none;
    }
  }
  .list {
    ul {
      li {
        position: relative;
        padding: 40px 0px;
        /*margin-bottom: 90px;*/
        border-bottom: 2px solid @gray;
        width: 100%;
        float: left;
        .img {
          margin-left: 50px;
          width: 170px;
          height: 170px;
          overflow: hidden;
          border-radius: 100%;
          border: 2px solid #fff;
          float: left;
          margin-top: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          float: left;
          margin-left: 40px;
          h1 {
            font-size: 56px;
            span {
              background: @primary-color;
              color: #fff;
              padding: 5px 20px;
              border-radius: 10px;
              font-size: 34px;
              margin-left: 10px;
            }
          }
          p {
            font-size: 42px;
            &.time {
              color: #808080;
            }
          }
        }
        .state {
          position: absolute;
          right: 0px;
          top: 0px;
          width: 200px;
          height: 200px;
          &.overdue {
            background: url(~assets/images/appointment-state-overdue.png)
              no-repeat;
            background-size: contain;
          }
          &.success {
            background: url(~assets/images/appointment-state-success.png)
              no-repeat;
            background-size: contain;
          }
          &.warn {
            background: url(~assets/images/appointment-state-warn.png) no-repeat;
            background-size: contain;
          }
          &.cancel {
            background: url(~assets/images/appointment-state-cancel.png)
              no-repeat;
            background-size: contain;
          }
        }
        .bottom {
          background: #e64340;
          color: #fff;
          padding: 20px 0px;
          margin-top: 30px;
          float: left;
          width: 100%;
          text-align: center;
          font-size: 42px;
        }
      }
    }
  }
}
</style>