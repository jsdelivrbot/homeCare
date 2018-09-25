<template>
	<div class='view-terms-of-use'>
		<x-header :title='$route.name'
		    :left-options="{backText: ''}"></x-header>
		<div class='content'>
			<p>　××网通过国际互联网络为您提供一种全新的在线社交方式；您只有完全同意下列所有服务条款并完成注册程序，才能成为××网的用户并使用相应服务。您在使用××网提供的各项服务之前，应仔细阅读本用户协议。</p>
		</div>
	</div>
</template>

<script>
export default {
  name: "termsOfUse",
  data() {
    return {};
  },

  computed: {},
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.view-terms-of-use {
  height: 100%;
  background: #fff;

  .content {
    padding: 40px;
    padding-top: 160px;

    text-align: center;

    p {
      text-align: left;
      font-size: 42px;
    }
  }
}
</style>