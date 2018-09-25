<template>
	<div class="footer">
		<ul class="clearfix">
			<li v-for='t in list'>
				<router-link :to="{path:t.href}">
					<i :class="t.class"></i>
					<p>{{t.text}}</p>
				</router-link>
			</li>
		</ul>
	</div>

</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          class: "iconHome",
          href: "/homeRouterView/home",
          text: "首页"
        },
        //				{
        //					class: 'iconMessage',
        //					href: '/404',
        //					text: '居家护理'
        //				},
        //				{
        //					class: 'iconSquare',
        //					href: '/404',
        //					text: '消息'
        //				},
        {
          class: "iconWelfare",
          href: "/userCenterRouterView/userCenter",
          text: "我的"
        }
      ]
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  components: {}
};
</script>

<style lang="less" scoped>
.footer {
  height: 130px;
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
  border-top: 1px solid @gray;
  background: #fff;
  ul {
    li {
      float: left;
      /*width: 25%;*/
      width: 50%;
      text-align: center;
      line-height: 16px;
      padding: 5px 0px;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
      p {
        font-size: 26px;
        color: #999;
        transition: all 0.2s;
      }
      i {
        width: 80px;
        height: 80px;
        background-size: contain;
        display: inline-block;
        transition: all 0.2s;
        margin-bottom: 15px;
        &.iconHome {
          background-image: url(../assets/images/home_menu_sy2.png);
        }
        &.iconMessage {
          background-image: url(../assets/images/home_menu_jjhl2.png);
        }
        &.iconSquare {
          background-image: url(../assets/images/home_menu_xx2.png);
        }
        &.iconWelfare {
          background-image: url(../assets/images/home_menu_wd2.png);
        }
      }
      .router-link-active {
        text-decoration: none;
        p {
          color: @primary-color;
        }
        i {
          &.iconHome {
            background-image: url(../assets/images/home_menu_sy1.png);
          }
          &.iconMessage {
            background-image: url(../assets/images/home_menu_jjhl1.png);
          }
          &.iconSquare {
            background-image: url(../assets/images/home_menu_xx1.png);
          }
          &.iconWelfare {
            background-image: url(../assets/images/home_menu_wd1.png);
          }
        }
      }
    }
  }
}
</style>