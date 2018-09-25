<template>
  <div class="view-ecg-content">
    <img :src="src" alt="" style='width:100%'>
    <!-- <div class="boack">
        <canvas id="background" width='1150' height='400' style="margin-left: 20px">
        </canvas>
    </div>
    <div class="boack">
        <canvas id="line"  width='1150' height='400' style="margin-left: 20px">
        </canvas>
    </div> -->

  </div>

</template>


<script>
export default {
  data() {
    return {
     
    };
  },
  computed: {
   src(){
     return this.$route.query.ecgImage;
   }
  },
  mounted() {
    // this.getData()
   
  },
  methods: {
    getData() {
       this.$vux.loading.show({
            text: "加载中"
          });
      this.$ajax({
        data: {
          header: {
            action: "GetEEGData"
          },
        body: {
							eegid:this.$route.query.id
						}
        },
        success: res => {
          var data=res.body.map((t)=>{
            return t.EcgV/349
          });
          
          var ecgObj=new Ecg({
            datas:data
          });
          ecgObj.drawecg();
          ecgObj.ecg();
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.boack {
    position: absolute;
    left: 0px;
    top: 50px;
    width:100%;
    height: 400px;
    canvas{
    
    }
}
</style>
