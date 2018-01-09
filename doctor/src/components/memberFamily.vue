<template>
	<div class="view-member-family">
		<x-dialog v-model='show'  :hide-on-blur='true' :scroll='false'>
			<scroller ref='scroller' :on-refresh="refresh" :on-infinite="infinite">
			<spinner type="lines" slot="refresh-spinner"></spinner>
			<spinner type="dots" slot="infinite-spinner"></spinner>
			<div class="list">
				<ul v-if='list.length>0' class="clearfix">
					<li v-for='(t,i) in list' @click='onHide(t)'>
						<div class="common-box-list">
							<div class="box-body">
								<div class="img">
									<img :src="t.UserHeaderPhoto" />
								</div>
								<div class="text">
									<p>
										<span class='name'>{{t.RealName}}</span>
										<!--<span class='sex'>{{$common.sexType[t.Sex]}}</span>
										<span class='age'>{{t.UserAge}}岁</span>-->
									</p>
									<p>
										<!--<span class='tel'>联系电话：{{t.Mobile}}</span>-->
									</p>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<span v-else class='no-data'>没有数据</span>
			</div>
		</scroller>
			
		</x-dialog>
	</div>

</template>

<script>
	import { XDialog, Spinner } from 'vux'
	import mixins from 'assets/js/mixins.js'
	export default {
		name: 'memberFamily',
		mixins: [mixins.scroller],
		data() {
			return {
				show: false				
			}
		},
		computed: {
			ajaxData() {
				return {
					header: {
						action: 'GetPatientSignList',
					},
					body: {
						DoctorID: this.$common.getLocalStorage('user').doctorid,
						CheckState:'1',
					}
				};
			}
		},
		methods: {			
			onHide(opt) {
				this.show = false;
				this.$emit('on-hide', opt);
			}
		},
		mounted() {},
		components: {
			XDialog,
			Spinner
		}
	}
</script>

<style lang="less">
	.view-member-family {x
		position: relative;
		.weui-dialog {
			min-height: 200px;
			/*max-height: 900px;*/
			height:50%;
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
				.img {display: inline-block;}
				.text {
					display: inline-block;
					width: 150px;
					text-align: left;
				}
			}
		}
	}
</style>