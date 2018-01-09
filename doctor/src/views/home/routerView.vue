<template>
	<div style='height:100%'>
		<x-header :title='$route.name' :transition="headerTransition"></x-header>
		<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
			<router-view class="router-view"></router-view>
		</transition>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	export default {
		data() {
			return {
				
			}
		},
		computed: {			
			direction(){
				return this.$store.state.direction
			},
			headerTransition() {
				return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
			}
		},
		methods: {},
		mounted() {
			
		},

		components: {
			XHeader

		}
	}
</script>

<style lang="less" scoped>

</style>