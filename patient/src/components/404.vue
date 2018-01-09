<template>
	<div class='view-404 common-padding'>
		<x-header :title='$route.name'></x-header>
		<div class="content">
			<img src="~assets/images/404.png"/>
		</div>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
	export default {
		name:'noPage',		
		data() {
			return {

			}
		},		
		computed: {},
		methods: {			
		},
		mounted() {
		},
		components: {
			XHeader
		}
	}
</script>

<style lang="less" scoped>
.content{
	    position: absolute;
    top: 50%;
    transform: translate3d(0, -50%, 0);
	font-size:52px;
	text-align:center;
	
	padding:150px;
	img{
		width: 100%;
	}
}
</style>