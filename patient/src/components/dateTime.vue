<template>
	<div class='common-date-time'>
		<a @click='showDateTime({type:"startTime"})'>
			<span v-if='startTime==""'>
				<i class='icon'></i>开始时间
			</span>
			<span v-else>{{startTime}}</span>
		</a>
		<a @click='showDateTime({type:"endTime"})'>
			<span v-if='endTime==""'>
				<i class='icon'></i>结束时间
			</span>
			<span v-else>{{endTime}}</span>
		</a>
	</div>
</template>

<script>
import mixins from "assets/js/mixins.js";
export default {
  mixins: [mixins.dateTime],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<style lang="less">
</style>