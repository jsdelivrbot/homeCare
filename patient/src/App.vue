<template>
	<div ref='app' id="app-box">
		<router-view ></router-view>
		<!--<sos></sos>-->
	</div>
</template>
<script>
	// import sos from 'components/sos'

	
	export default {
		name: 'App',
	
		data() {
			return {
				
			}
		},
		computed: {},
		methods: {},
		mounted() {
		},
		components: {
			// sos
			
		}
	}
</script>
<style lang="less">	
	@import '~vux/src/styles/reset.less';/*vux清除格式*/
	@import '~assets/less/animate.min.css';/*css3动画库*/
	@import '~assets/less/coverVux.less';/*覆盖vux的样式*/
	@import '~assets/less/common.less';  /*全局通用*/	
	
</style>