<template>
	<div class='view-contract-doctor'>
		<div class="common-header-right">
			<router-link v-show='isSign=="1"&&!$route.query.userId'
			    :to="{path:'/homeRouterView/hospital'}">添加</router-link>
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
					<li v-for='(t,i) in filterList'>
						<router-link :to="{path: '/homeRouterView/contractDoctorDetails',query:{id:t.ID,isSign:isSign,userId:$route.query.userId}}">
							<div class="img">
								<img :src="t.HeaderPhoto" />
							</div>
							<div class="text">
								<h3>{{t.RealName}}
									<span>{{t.ClinicalTitle}}</span>
									<rater v-model="t.ServiceStar"
									    slot="value"
									    active-color="#FF9900"
									    :margin="4"
									    disabled></rater>
								</h3>
								<p>
									<span class='treatment'>擅长：{{t.GoodAtTreatment}}</span>
									<span>签约患者：{{t.SignUserCount}}</span>
								</p>
							</div>
						</router-link>
					</li>
				</ul>
			</div>
		</scroller>
	</div>
</template>

<script>
import mixins from "assets/js/mixins.js";
export default {
  name: "contractDoctor",
  mixins: [mixins.scroller],
  data() {
    return {};
  },
  computed: {
    filterList() {
      return this.list.map(t => {
        t.ServiceStar = parseFloat(t.ServiceStar);
        return t;
      });
    },
    //是否签约 0未签约1已签约
    isSign() {
      if (this.$route.query.departmentId) {
        return 0;
      } else {
        return 1;
      }
    },
    ajaxData() {
      return {
        header: {
          action: "GetDoctorList"
        },
        body: {
          userid:
            this.$route.query.userId ||
            this.$common.getLocalStorage("user").userid,
          SignType: this.isSign,
          HospitalID: this.$route.query.hospitalId,
          DepartID: this.$route.query.departmentId,
          DoctorName: ""
        }
      };
    }
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
.view-contract-doctor {
  height: 100%;
  background: #fff;
  .list {
    ul {
      padding-top: 20px;
      padding-bottom: 20px;
      li {
        float: left;
        width: 100%;
        border-bottom: 1px solid @gray;
        padding: 40px;
        .img {
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
    }
  }
}
</style>