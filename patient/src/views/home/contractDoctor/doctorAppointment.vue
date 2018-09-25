<template>
	<div class='view-doctor-appointment common-padding'>
		<div class="content">
			<div class="hospital-name">
				{{details.AgencyName}}
			</div>
			<div class="clearfix">
				<div class="details">
					<div class="img">
						<img :src="details.HeaderPhoto" />
					</div>
					<div class="text">
						<h3>{{details.RealName}}
							<span>{{details.ClinicalTitle}}</span>
						</h3>
						<p>
							<span class='treatment'>擅长：{{details.GoodAtTreatment}}</span>
							<span>签约患者：{{details.SignUserCount}}</span>
						</p>
					</div>
				</div>
			</div>
			<div class="table">
				<table>
					<tr>
						<th>排班</th>
						<th>上午<br />08:30-12:00</th>
						<th>下午<br />13:30-17:30</th>
					</tr>
					<tr v-for='t in list'>
						<td>{{t.ToDate.split('-')[1]+'月'+t.ToDate.split('-')[2]+'日'}}<br />
							<!-- 周{{$common.dateWeek[t.DateWeek]}} -->
						</td>
						<td :class='{active:t.Morning&&t.Morning.free}'>
							<span v-if='t.Morning'>
								<span v-if='t.Morning.free'
								    @click='addAppointment({ToDate:t.ToDate,TimeSlot:1})'>预约</span>
								<span v-else>已约满</span>
							</span>
							<span v-else>没排班</span>
						</td>
						<td :class='{active:t.Afternoon&&t.Afternoon.free}'>
							<span v-if='t.Afternoon'>
								<span v-if='t.Afternoon.free'
								    @click='addAppointment({ToDate:t.ToDate,TimeSlot:2})'>预约</span>
								<span v-else>已约满</span>
							</span>
							<span v-else>没排班</span>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  name: "contractDoctorDetails",
  data() {
    return {
      confirm: false,
      list: []
    };
  },
  computed: {
    //通过路由传过来的医生信息
    details() {
      return JSON.parse(this.$route.query.details);
    }
  },
  methods: {
    //获取医生排班信息
    getDoctorSchedule() {
       this.$vux.loading.show({
            text: "加载中"
          });
      this.$ajax({
        data: {
          header: {
            action: "GetDoctorSchedule"
          },
          body: {
            DoctorID: this.$route.query.id,
            StartTime: this.$common.getWeek().startTime,
            EndTime: this.$common.getWeek().endTime
          }
        },
        success: res => {
          this.list = res.map(t => {
            if (t.Afternoon) {
              if (t.Afternoon.AppointCurNum < t.Afternoon.AppointMaxNum) {
                t.Afternoon.free = true;
              }
            }
            if (t.Morning) {
              if (t.Morning.AppointCurNum < t.Morning.AppointMaxNum) {
                t.Morning.free = true;
              }
            }
            return t;
          });
        }
      });
    },
    //发起预约挂号
    addAppointment(opt) {
      let tip = opt.TimeSlot == 1 ? "上午" : "下午";
      this.$vux.confirm.show({
        title: "提示",
        content: "预约" + opt.ToDate + tip + "？",
        onConfirm: () => {
           this.$vux.loading.show({
            text: "加载中"
          });
          this.$ajax({
            data: {
              header: {
                action: "AddAppointment"
              },
              body: {
                UserID: this.$common.getLocalStorage("user").userid,
                DoctorID: this.$route.query.id,
                ToDate: opt.ToDate,
                TimeSlot: opt.TimeSlot
              }
            },
            success: res => {
              this.$vux.toast.show({
                text: res.cause
              });
            }
          });
        }
      });
    }
  },
  mounted() {
    this.getDoctorSchedule();
  }
};
</script>

<style lang="less" scoped>
.view-doctor-appointment {
  .content {
    background: #fff;
    .hospital-name {
      font-size: 52px;
      margin: 40px;
      padding-bottom: 30px;
      margin-bottom: 60px;
      border-bottom: 2px solid #cdcdcd;
    }
    .details {
      float: left;
      width: 100%;
      .img {
        margin-left: 40px;
        margin-top: -15px;
        border: 2px solid @gray;
        float: left;
        width: 180px;
        height: 180px;
        border-radius: 100%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        width: 73%;
        margin-left: 30px;
        float: left;
        h3 {
          width: 100%;
          position: relative;
          font-size: 42px;
          span {
            color: #f86201;
            font-size: 42px;
            margin-left: 10px;
          }
        }
        p {
          margin-top: 20px;
          font-size: 42px;
          span {
            float: right;
            &.treatment {
              float: left;
              width: 500px;
              height: 70px;
              display: inline-block;
              overflow: hidden;
              -webkit-line-clamp: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
    .table {
      background: #fff;
      width: 100%;
      margin: 0 auto;
      margin-top: 50px;
      padding-bottom: 40px;
      table {
        width: 100%;
        th,
        td {
          text-align: center;
          font-size: 42px;

          width: 33.333%;
          span {
            width: 100%;
            display: inline-block;
            height: 110px;
            line-height: 110px;
          }
        }
        th {
          color: #fff;
          background: @primary-color;
          border: 1px solid @primary-color;
        }
        td {
          border: 2px solid @gray;
          &.active {
            color: #fff;
            background: #59b23a;
          }
        }
      }
    }
  }
}
</style>