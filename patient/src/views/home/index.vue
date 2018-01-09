<template>
	<div class='view-home'>
		<div class="common-header-left">
			<router-link :to="{path:'/homeRouterView/trackView'}">
				<img class='img-btn' src="~assets/images/title_wz.png" />
			</router-link>
		</div>
		<!--<div class="common-header-right">
			<router-link :to="{path:'/404'}">
				<img class='img-btn' src="~assets/images/title_mes.png" />
			</router-link>
		</div>-->
		<swiper :list="banner.list" auto v-model="banner.index" dots-position='center'></swiper>
		<div class="plate-box">
			<ul>
				<li>
					<router-link :to="{path:'/homeRouterView/healthData'}">
						<div class="img menu1"></div>
						<p>健康数据</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'/homeRouterView/contractDoctor'}">
						<div class="img menu2"></div>
						<p>签约医生</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'/homeRouterView/healthInterventionProgram'}">
						<div class="img menu3"></div>
						<p>健康建议</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'/homeRouterView/healthRule'}">
						<div class="img menu4"></div>
						<p>预警设置</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'/homeRouterView/appointment'}">
						<div class="img menu5"></div>
						<p>预约挂号</p>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'/homeRouterView/familyMember'}">
						<div class="img menu6"></div>
						<p>关注家属</p>
					</router-link>
				</li>
			</ul>
		</div>
		<div class="line-bg"></div>
		<div class="news-box">
			<div class="title">热门资讯
				<!--<router-link class='more-btn' :to="{path:''}">
					MORE
				</router-link>-->
				</a>
			</div>
			<div class="list">
				<spinner type="ios" v-if='news.loading'></spinner>
				<ul v-else class="clearfix">
					<li v-for='t in news.list'>
						<router-link :to="{path:'/homeRouterView/newsDetails',query:{id:t.ID}}">
							<div class="img">
								<img :src="t.PicIndex" />
							</div>
							<div class="text">
								<h3 class="beyond-hide">{{t.Title}}</h3>
								<p class="beyond-hide">{{t.ContentIndex}}</p>
								<div class="text-bottom">
									{{t.ShowTime}}
									<!--<span class='msg'>
										{{t.ViewNum}}
									</span>-->
								</div>
							</div>
						</router-link>
					</li>
				</ul>
				<div class="more">
					<a @click='getNewsMore' v-if='news.hasData'>查看更多</a>
					<a v-else class='noData'>没有更多数据了...</a>
				</div>
			</div>
		</div>
		<xh-foot></xh-foot>
		<sos></sos>
	</div>
</template>
<script>
	import { XHeader, Swiper, Spinner } from 'vux'
	import xhFoot from 'components/footer';
	import sos from 'components/sos'
	export default {
		name: 'home',
		data() {
			return {
				news: {
					loading: true,
					list: [],
					page: 1,
					pageSize: 5,
					hasData: true,
				},
				banner: {
					active: 0,
					list: []
				}
			}
		},
		methods: {
			//获取海报
			getBanner() {
				this.$common.ajax({
					result: true,
					loading: false,
					data: {
						header: {
							action: 'GetAppAdvertisement',
						},
						body: {

						}
					},
					success: (res) => {
						res.forEach((t) => {
							this.banner.list.push({
								img: t.photo
							})
						})

					}
				})
			},
			//获取新闻列表
			getNews() {
				this.$common.ajax({
					result: true,
					loading: false,
					data: {
						header: {
							action: 'GetNewsListSingle',
						},
						body: {
							pageindex: this.news.page,
							pagesize: this.news.pageSize
						}
					},
					success: (res) => {
						this.news.loading = false;
						if(res.length > 0) {
							this.news.list = [...this.news.list, ...res];
						} else {
							this.news.hasData = false;
						}

					}
				})
			},
			//获取更多新闻
			getNewsMore() {
				this.news.page += 1
				this.getNews();
			}
		},
		mounted() {
			this.getNews();
			this.getBanner();
		},
		destroyed() {

		},

		components: {
			Swiper,
			XHeader,
			xhFoot,
			Spinner,
			sos

		}
	}
</script>

<style lang="less" >
	.view-home {
		padding-top: 110px;
		padding-bottom: 130px;
		.vux-slider {
			height: 600px;
			.vux-img{
				background-size:100% 100%!important ;
			}
		}
		.plate-box {
			background: #fff;
			border-bottom: 1px solid @gray;
			padding-bottom: 50px;
			.loopQuickList(@n, @i: 1) when (@i =< @n) {
				.menu@{i} {
					width: 158px;
					height: 158px;
					margin: 0 auto;
					background-size: contain;
					background-image: url("~assets/images/home_btn_@{i}.png");
				}
				.loopQuickList(@n,
				(@i + 1));
			}
			.loopQuickList(6);
			ul {
				font-size: 0;
				li {
					width: 33.333%;
					height: 265px;
					margin-top: 50px;
					display: inline-block;
					text-align: center;
					p {
						font-size: 38px;
					}
				}
			}
		}
		.line-bg {
			background: #e3e3e5;
			height: 22px;
		}
		.news-box {
			background: #fff;
			border-top: 1px solid @gray;
			.title {
				padding: 30px 0px;
				font-size: 42px;
				padding-left: 70px;
				margin-left: 30px;
				background: url(../../assets/images/home_news.png) no-repeat left;
				background-size: 50px 50px;
				.more-btn {
					float: right;
					margin-right: 30px;
				}
			}
			span.vux-spinner {
				position: relative!important;
				padding-bottom: 40px!important;
			}
			.list {
				border-top: 1px solid @gray;
				padding-bottom: 50px;
				ul {
					padding: 0px 40px;
					padding-top: 40px;
					li {
						width: 100%;
						float: left;
						margin-bottom: 25px;
						height: 245px;
						border-bottom: 1px solid @gray;
						padding-bottom: 25px;
						.img {
							width: 260px;
							height: 235px;
							float: left;
							img {
								width: 100%;
								height: 100%;
							}
						}
						.text {
							position: relative;
							height: 100%;
							margin-left: 30px;
							width: 700px;
							float: left;
							h3 {
								font-size: 42px;
								overflow: hidden;
								-webkit-line-clamp: 1;
							}
							p {
								font-size: 36px;
								color: #808080;
								-webkit-line-clamp: 2;
							}
							.text-bottom {
								position: absolute;
								width: 100%;
								bottom: 0px;
								font-size: 28px;
								color: #999;
								.msg {
									float: right;
									background: url(../../assets/images/home_menu_xx2.png) no-repeat;
									background-size: 50px 50px;
									padding-left: 65px;
								}
							}
						}
						&:last-child {
							border: none;
						}
					}
				}
				.more {
					text-align: center;
					width: 90%;
					margin: 0 auto;
					a {
						display: block;
						font-size: 42px;
						color: #fff;
						background: @primary-color;
						border-radius: 15px;
						padding: 10px 0px;
						&.noData {
							background: #fff;
							color: #959595;
						}
					}
				}
			}
		}
	}
</style>