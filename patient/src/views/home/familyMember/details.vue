<template>
	<div class='view-family-details common-padding'>
		<div class="common-user-details">
			<div class="left active"
			    @click='deteleData'>
				<img src="~assets/images/common-see.png" />
				<p>取消关注</p>
				<!--<p>{{type=="0"?"取消关注":"关注"}}</p>-->
			</div>
			<div class="center">
				<div class="img">
					<img :src="details.HeaderPhoto" />
				</div>
				<h1>{{details.RealName}}
					<i class='active'></i>
				</h1>
				<p>{{$common.sexType[details.Sex]}}&nbsp;&nbsp;&nbsp;&nbsp;</p>
			</div>
			<!--<div class="right">
				<router-link :to="{path: '/404'}">
					<img src="~assets/images/common-chat.png" />
					<p>聊天</p>
				</router-link>
				
			</div>-->
		</div>
		<div class="content">
			<div class="wrap"
			    v-if='type=="0"'>
				<ul>
					<!-- <li>
						<router-link :to="{path:'/homeRouterView/healthData',query:{userId:details.ID}}">
							<img src="~assets/images/family-healthData.png" />
							<p>健康数据</p>
						</router-link>
					</li> -->
					<li>
						<router-link :to="{path:'/homeRouterView/healthInterventionProgram',query:{userId:details.ID}}">
							<img src="~assets/images/family-healthIntervention.png" />
							<p>健康干预</p>
						</router-link>
					</li>
					<li>
						<router-link :to="{path:'/homeRouterView/contractDoctor',query:{userId:details.ID}}">
							<img src="~assets/images/family-doctor.png" />
							<p>签约医生</p>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="list">
				<ul>
					<li class="tel">
						<p>
							<i></i>联系电话</p>
						<span>{{details.Mobile}}</span>
					</li>
					<li class="address">
						<p>
							<i></i>居住地址</p>
						<span>{{details.Address}}</span>
					</li>
				</ul>
			</div>
		</div>
		<confirm v-model="confirm"
		    title="提交"
		    @on-cancel="onCancel"
		    @on-confirm="onConfirm">
			<x-textarea v-model='applyText'
			    placeholder="请输入备注"
			    autosize></x-textarea>
		</confirm>
	</div>
</template>

<script>
import mixins from "assets/js/mixins.js";
export default {
  name: "familyMemberDetails",
  mixins: [mixins.addConcernApply],
  data() {
    return {};
  },
  computed: {
    //类型
    type() {
      return this.$route.query.type;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    //关注取消关注切换
    submitSelect() {
      this.type == "0" ? this.deteleData() : (this.confirm = true);
    },
    deteleData() {
      this.$vux.confirm.show({
        title: "提示",
        content: "确认删除关注？",
        onConfirm: () => {
           this.$vux.loading.show({
            text: "加载中"
          });
          this.$ajax({
            data: {
              header: {
                action: "DeleteConcern"
              },
              body: {
                ConcernID: this.$route.query.concernId,
                DeleteUserID: this.$common.getLocalStorage("user").userid
              }
            },
            success: res => {
              this.$vux.toast.show({
                text: "取消关注成功",
                type: "success",
                onHide: () => {
                  this.$router.push({
                    path: "/homeRouterView/familyMember"
                  });
                }
              });
            }
          });
        }
      });
    },
    getData() {
       this.$vux.loading.show({
            text: "加载中"
          });
      this.$ajax({
        data: {
          header: {
            action: "GetUserInfo"
          },
          body: {
            userid: this.$route.query.id
          }
        },
        success: res => {
          this.details = res;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.view-family-details {
  .content {
    margin-top: 350px;
    .wrap {
      border-top: 1px solid @gray;
      padding: 60px 0px;
      ul {
        font-size: 0px;
        li {
          text-align: center;
          display: inline-block;
          border-right: 1px solid @gray;
          width: 33.09%;
          img {
            width: 120px;
            height: 120px;
            margin-bottom: 20px;
          }
          p {
            font-size: 42px;
          }
          &:last-child {
            border: none;
          }
        }
      }
    }
    .list {
      ul {
        border-top: 1px solid @gray;
        li {
          width: 100%;
          position: relative;
          border-bottom: 1px solid @gray;
          font-size: 42px;
          padding-bottom: 30px;
          padding-top: 30px;
          p {
            i {
              width: 80px;
              height: 80px;
              display: inline-block;
              vertical-align: -7px;
              margin: 0 20px;
              margin-left: 40px;
            }
          }
          span {
            width: 680px;
            height: 65px;
            overflow: hidden;
            text-align: right;
            position: absolute;
            right: 40px;
            top: 40px;
          }
          &.tel {
            i {
              background: url(~assets/images/common-phone.png) no-repeat center;
              background-size: contain;
            }
          }
          &.address {
            i {
              background: url(~assets/images/common-address.png) no-repeat
                center;
              background-size: contain;
            }
          }
        }
      }
    }
  }
}
</style>