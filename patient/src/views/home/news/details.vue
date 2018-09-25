<template>
	<div class='view-news-details common-padding'>
		<div class="content">
			<h1>{{details.Title}}<br />
				<span>{{details.ShowTime}}</span>
			</h1>
			<div class='pic'>
				<img :src="details.PicIndex"
				    alt="">
			</div>
			<div class='text'
			    v-html='details.Content'></div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      details: {}
    };
  },
  computed: {},
  methods: {
    //获取新闻
    getNews() {
      this.$vux.loading.show({
        text: "加载中"
      });
      this.$ajax({
        data: {
          header: {
            action: "GetNewsInfo"
          },
          body: {
            id: this.$route.query.id
          }
        },
        success: res => {
          this.details = res;
        }
      });
    }
  },
  mounted() {
    this.getNews();
  },
  destroyed() {},

};
</script>

<style lang="less">
.view-news-details {
  height: auto !important;
  &.isLink {
    padding: 0px !important;
  }
  .content {
    width: 100%;
    overflow: hidden;
    padding-top: 50px;
    font-size: 42px;
    h1 {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #bfbfbf;
      span {
        font-size: 36px;
        color: #929292;
      }
    }
    p {
      font-size: 36px;
      line-height: 72px;
      margin-bottom: 10px;
    }
    .pic {
      padding: 10px;
      margin-top: 10px;
    }
    .text {
      padding: 40px;
      padding-top: 0px;
    }
    img {
      width: 100% !important;
      height: auto !important;
    }
  }
}
</style>