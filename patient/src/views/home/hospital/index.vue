<template>
	<div class='view-hospital'>
		<div class="common-header-right">
			<spinner type="ios"
			    v-if='addressLoading'></spinner>
			<div class="address-select"
			    v-else>
				<a>{{location.address.district}}</a>
				<x-address class='addressSelect'
				    @on-hide='replaceText'
				    ref='addressSelect'
				    title='城市'
				    v-model="addressSelect"
				    :list="addressData"
				    placeholder="请选择城市"></x-address>
			</div>
		</div>
		<div class="common-search">
			<input type="search"
			    v-model='search'
			    placeholder="请输入医院名称"
			    @keyup.enter="getData({search:true})" />
		</div>
		<div class="list">
			<spinner type="ios"
			    v-if='loading'></spinner>
			<ul class="clearfix"
			    v-else>
				<li v-for='t in list'>
					<router-link :to="{path: '/homeRouterView/hospitalDepartment',query:{id:t.ID}}">
						<div class="img">
							<img :src="t.AgencyLogo" />
						</div>
						<div class="text">
							<h1>{{t.AgencyName}}
								<span>{{t.AgencyLevel}}</span>
							</h1>
							<p>医院性质：
								<span>{{t.AgencyProp}}</span>
							</p>
							<p class="address">医院地址：
								<span>{{t.Address}}</span>
							</p>
						</div>
					</router-link>
				</li>
				<div class="common-no-data"
				    v-if='list.length<=0'>
					没有更多数据
				</div>
			</ul>

		</div>
	</div>
	</div>
	</div>
</template>
<script>
// import _ from "lodash"; //lodash函数处理库
export default {
  name: "hospital",
  data() {
    return {
      addressLoading: false,
      loading: true,
      location: {}, //百度api获取的位置
      search: "",
      list: []
    };
  },
  computed: {
    //获取浏览器缓存LocalStorage里的城市json
    addressData() {
      return this.$common.getLocalStorage("cityList");
    },
    //城市编码ID
    addressSelect() {
		debugger
    //   let province = _.find(this.addressData, t => {
    //     return t.name == this.location.address.province;
	//   }).value;	  
    //   let city = _.find(this.addressData, t => {
    //     return t.name == this.location.address.city;
    //   }).value;
    //   let district = _.find(this.addressData, t => {
    //     return t.name == this.location.address.district;
	//   }).value;

	  let province= this.addressData.find((t)=>{
		  return t.name == this.location.address.province;
	   }).value
	   let city= this.addressData.find((t)=>{
		  return t.name == this.location.address.city;
	   }).value
	   let district= this.addressData.find((t)=>{
		  return t.name == this.location.address.district;
	   }).value

      return [province, city, district];
    }
  },
  watch: {},
  methods: {
    //替换右上角地址文字
    replaceText() {
      this.location.address.district = this.$refs.addressSelect.nameValue.split(
        " "
      )[2];
      this.getData();
    },
    //获取医院列表
    getData(opt) {
      this.loading = true;
      this.$ajax({
        data: {
          header: {
            action: "GetHospitalList"
          },
          body: {
            KeyWord: this.search,
            CityID: opt && opt.search ? "" : this.addressSelect[2],
            Level: "",
            IsMedicare: "",
            Prop: ""
          }
        },
        success: res => {
          this.loading = false;
          this.list = res;
        }
      });
    },
    //获取定位
    getLocation() {
      this.addressLoading = true;
      new BMap.Geolocation().getCurrentPosition(location => {
        this.location = location;
        if (location.address.district == "") {
          this.location.address.district = "鹿城区";
        }
        this.addressLoading = false;
        this.getData();
      });
    }
  },
  mounted() {
    this.getLocation();
  }
};
</script>

<style lang="less">
.view-hospital {
  padding-top: 110px;
  .list {
    min-height: 200px;
    background: #fff;
    ul {
      li {
        padding: 40px 0px;
        background: #fff;
        float: left;
        width: 100%;
        border-bottom: 2px solid #d7d7d7;
        &:last-child {
          border: none;
        }
        .img {
          margin-left: 40px;
          float: left;
          width: 350px;
          height: 250px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          margin-right: 40px;
          margin-top: 20px;
          width: 600px;
          float: left;
          margin-left: 40px;
          h1 {
            font-size: 52px;
            width: 100%;
            overflow: hidden;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            span {
              color: #f76301;
              float: right;
            }
          }
          p {
            font-size: 42px;
            color: #989898;
            overflow: hidden;
            -webkit-line-clamp: 1;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            span {
              color: #f76301;
            }
            &.address {
              span {
                color: #000;
              }
            }
          }
        }
      }
    }
  }
}
</style>