<template>
	<div class='view-contract-doctor-evaluate'>
		<group class="common-menu-list">
			<cell title="评价总数："
			    :value='doctorEvaluation.TotalCount+"条"'></cell>
			<cell title="平均星级：">
				<rater v-model="doctorEvaluation.AveStar"
				    active-color="#FF9900"
				    :margin="4"
				    slot='child'
				    disabled></rater>
			</cell>
		</group>
		<scroller ref='scroller'
		    class='common-scroller'
		    :on-refresh="refresh"
		    :on-infinite="infinite">
			<spinner type="lines"
			    slot="refresh-spinner"></spinner>
			<spinner type="dots"
			    slot="infinite-spinner"></spinner>
			<div class="list">
				<group class="common-menu-list">
					<cell v-for='t in list'
					    title="评价星级："
					    :inline-desc='t.Content'
					    :value='t.AddTime.split(" ")[0]'
					    :key='t.ID'>
						<rater v-model="t.ServiceStar"
						    active-color="#FF9900"
						    :margin="4"
						    slot='icon'
						    disabled></rater>
					</cell>
				</group>

			</div>
		</scroller>
	</div>
</template>

<script>
import mixins from "assets/js/mixins.js";
export default {
  name: "contractDoctorEveluate",
  mixins: [mixins.scroller],
  data() {
    return {
      doctorEvaluation: {}
    };
  },
  computed: {
    ajaxData() {
      return {
        header: {
          action: "GetCommentList"
        },
        body: {
          DoctorID: this.$route.query.id
        }
      };
    }
  },
  methods: {
    getCommentStat() {
       this.$vux.loading.show({
            text: "加载中"
          });
      this.$ajax({
        data: {
          header: {
            action: "GetCommentStat"
          },
          body: {
            DoctorID: this.$route.query.id
          }
        },
        success: res => {
          this.doctorEvaluation = res;
        }
      });
    }
  },
  mounted() {
    this.getCommentStat();
  }
};
</script>

<style lang="less">
.view-contract-doctor-evaluate {
  padding-top: 110px;
  .common-menu-list {
    .vux-rater {
      margin-top: 30px;
      margin-right: 40px;
    }
  }
  /*.scroller-box{
			height:100%;
			position: relative;
		}*/
  .common-scroller {
    height: 1470px !important;
    background: #fff;
    top: 450px !important;
    padding-top: 0;
    padding-bottom: 0px;
    .common-menu-list {
      .vux-rater {
        left: 280px;
        top: 5px;
      }
    }
    .weui-cell__ft {
      position: absolute;
      top: 40px;
      right: 40px;
      &::after {
        display: none;
      }
    }
    .vux-cell-bd {
      p {
        margin-bottom: 20px;
      }
    }
    .vux-label-desc {
      font-size: 38px;
      overflow: hidden;
    }
  }
}
</style>