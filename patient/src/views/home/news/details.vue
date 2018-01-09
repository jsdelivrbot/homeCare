<template>
	<div class='view-news-details common-padding'>
		<spinner type="ios" v-if='loading'></spinner>
		<div class="content" v-else>
			<h1>{{details.Title}}<br /><span>{{details.ShowTime}}</span></h1>
			<div class='text' v-html='details.Content'></div>
		</div>
	</div>
</template>
<script>
	import { XHeader, Spinner } from 'vux'
	export default {
		data() {
			return {
				loading: false,
				details: {}
			}
		},
		computed:{
			
		},
		methods: {
			//获取新闻
			getNews() {
				this.loading = true;
				this.$common.ajax({
					result: true,
					loading: false,
					data: {
						header: {
							action: 'GetNewsInfo',
						},
						body: {
							id: this.$route.query.id
						}
					},
					success: (res) => {
						this.loading = false;
						this.details = res;
					}
				})
			}
		},
		mounted() {
			this.getNews();
		},
		destroyed() {

		},

		components: {
			XHeader,
			Spinner

		}
	}
</script>

<style lang="less">
	.view-news-details {
		height: auto!important;
		&.isLink{
			padding:0px!important;
		}
		.content {
			width: 100%;
			overflow: hidden;
			padding-top: 50px;
			text-align: center;
			font-size: 52px;
			h1 {
				padding-bottom: 20px;
				border-bottom: 1px solid #dfdfdf;
				span {
					font-size: 42px;
				}
			}
			.text {
				padding: 40px;
			}
			img{
			width: 100%!important;
			height: auto!important;
		}
		}
	}
</style>