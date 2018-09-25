<template>
	<div class="view-member-family">
		<x-dialog v-model='show' @on-show='getData' :hide-on-blur='true' :scroll='false'>
			<div class="list">
				<spinner type="ios" v-if='loading'></spinner>
				<div v-else>					
					<ul v-if='list.length>0' class="clearfix">
						<li v-for='(t,i) in list' @click='onHide(t)'>
							<div class="common-box-list">
								<div class="box-body">
									<div class="img">
										<img :src="t.HeaderPhoto" />
									</div>
									<div class="text">
										<p>
											<span class='name'>{{t.RealName}}</span>
											<span class='sex'>{{$common.sexType[t.Sex]}}</span>
											<span class='age'>42岁</span>
										</p>
										<p>
											<span class='tel'>联系电话：{{t.Mobile}}</span>
										</p>
									</div>
								</div>
							</div>
						</li>
					</ul>
					<span v-else class='no-data'>没有数据</span>
				</div>
			</div>
		</x-dialog>
	</div>

</template>

<script>
	export default {
		name: 'memberFamily',
		data() {
			return {
				show: false,
				list: [],
				loading: false
			}
		},
		computed: {},
		methods: {
			getData() {
				this.loading = true;
				setTimeout(() => {					
					this.$ajax({
						data: {
							header: {
								action: 'GetConcernList',
							},
							body: {
								userid: this.$common.getLocalStorage('user').userid,
								Type: '0'
							}
						},
						success: (res) => {
							this.loading = false;
							this.list = res;
						}
					})
				}, 500)
			},
			onHide(opt) {
				this.show = false;
				this.$emit('on-hide', opt);
			}
		},
		mounted() {}
	}
</script>

<style lang="less">
	.view-member-family {
		position: relative;
		.weui-dialog {
			min-height: 200px;
			max-height: 900px;
			overflow: scroll;
			background: #fff;
		}
		.list {
			.no-data{
			    font-size: 42px;
    margin-top:70px;
    display: block;
		}
		}
		li {
			border-bottom: 2px solid #9a9a9a;
			padding: 40px 0px;
			&:last-child {
				border: none;
			}
			.common-box-list {
				.img {}
				.text {
					width: 550px;
					text-align: left;
				}
			}
		}
		
	}
</style>