<template>
  <div class='medicalHistory'>
    <group>
      <x-switch title="患恶性肿瘤"
        :value-map="valueMap"
        v-model="formModel.MalignantTumor"></x-switch>
      <div class='details-content-box'
        v-if='formModel.MalignantTumor==1'>
        <datetime v-model="formModel.MalignantTumorDate"
          title="确诊时间"></datetime>
        <x-input class='address'
          title="恶性肿瘤名称"
          v-model='formModel.MalignantTumorName'></x-input>
      </div>

      <x-switch title="患高血压"
        :value-map="valueMap"
        v-model="formModel.Hypertension"></x-switch>
      <div class='details-content-box'
        v-if='formModel.Hypertension==1'>
        <datetime v-model="formModel.HypertensionDate"
          title="确诊时间"></datetime>
      </div>

      <x-switch title="患糖尿病"
        :value-map="valueMap"
        v-model="formModel.Diabetes"></x-switch>
      <div class='details-content-box'
        v-if='formModel.Diabetes==1'>
        <datetime v-model="formModel.DiabetesDate"
          title="确诊时间"></datetime>
      </div>

      <x-switch title="患冠心病"
        :value-map="valueMap"
        v-model="formModel.HeartDisease"></x-switch>
      <div class='details-content-box'
        v-if='formModel.HeartDisease==1'>
        <datetime v-model="formModel.HeartDiseaseDate"
          title="确诊时间"></datetime>
      </div>

      <x-switch title="患慢性阻塞性肺病"
        :value-map="valueMap"
        v-model="formModel.PulmonaryDisease"></x-switch>
      <div class='details-content-box'
        v-if='formModel.PulmonaryDisease==1'>
        <datetime v-model="formModel.PulmonaryDiseaseDate"
          title="确诊时间"></datetime>
      </div>

      <x-switch title="患脑卒中"
        :value-map="valueMap"
        v-model="formModel.CerebralApoplexy"></x-switch>
      <div class='details-content-box'
        v-if='formModel.CerebralApoplexy==1'>
        <datetime v-model="formModel.CerebralApoplexyDate"
          title="确诊时间"></datetime>
      </div>

      <x-switch title="患重性精神疾病"
        :value-map="valueMap"
        v-model="formModel.MentalIllness"></x-switch>
      <div class='details-content-box'
        v-if='formModel.MentalIllness==1'>
        <datetime v-model="formModel.MentalIllnessDate"
          title="确诊时间"></datetime>
      </div>

      <x-switch title="患结核病"
        :value-map="valueMap"
        v-model="formModel.Tuberculosis"></x-switch>
      <div class='details-content-box'
        v-if='formModel.Tuberculosis==1'>
        <datetime v-model="formModel.TuberculosisDate"
          title="确诊时间"></datetime>
      </div>

      <x-switch title="患其他法定传染病"
        :value-map="valueMap"
        v-model="formModel.InfectiousDiseases"></x-switch>
      <div class='details-content-box'
        v-if='formModel.InfectiousDiseases==1'>
        <datetime v-model="formModel.InfectiousDiseasesDate"
          title="确诊时间"></datetime>
      </div>

      <x-switch title="患职业病"
        :value-map="valueMap"
        v-model="formModel.OccupationalDiseases"></x-switch>
      <div class='details-content-box'
        v-if='formModel.OccupationalDiseases==1'>
        <datetime v-model="formModel.OccupationalDiseasesDate"
          title="确诊时间"></datetime>
        <x-input class='address'
          title="职业病名称"
          v-model='formModel.OccupationalDiseasesName'></x-input>
      </div>

      <x-switch title="患其他疾病"
        :value-map="valueMap"
        v-model="formModel.OtherDiseases"></x-switch>
      <div class='details-content-box'
        v-if='formModel.OtherDiseases==1'>
        <datetime v-model="formModel.OtherDiseasesDate"
          title="确诊时间"></datetime>
        <x-input class='address'
          title="职业病名称"
          v-model='formModel.OtherDiseasesName'></x-input>
      </div>
      <divider style='margin-bottom:10px;'>手术史、外伤、输血史</divider>
      <x-textarea v-model='formModel.OperationName'
        placeholder="请输入手术史、外伤、输血史"></x-textarea>
      <divider style='margin-bottom:10px;'>家族史</divider>
      <x-textarea v-model='formModel.FamilyName'
        placeholder="请输入家族史"></x-textarea>
      <divider style='margin-bottom:10px;'>遗传病史</divider>
      <x-textarea v-model='formModel.HeredityName'
        placeholder="请输入遗传病史"></x-textarea>

      <divider>过敏史</divider>
      <checker v-model="anaphylaxisNameList"
        type="checkbox"
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected">
        <checker-item value="青霉素">青霉素</checker-item>
        <checker-item value="磺胺">磺胺</checker-item>
        <checker-item value="链霉素">链霉素</checker-item>
        <checker-item value="其他">其他</checker-item>
      </checker>

      <divider>暴露史</divider>
      <checker v-model="exposureNameList"
        type="checkbox"
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected">
        <checker-item value="化学品">化学品</checker-item>
        <checker-item value="毒物">毒物</checker-item>
        <checker-item value="射线">射线</checker-item>
        <checker-item value="其他">其他</checker-item>
      </checker>

       <divider>残疾情况</divider>
      <checker v-model="disabilityNameList"
        type="checkbox"
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected">
        <checker-item value="视力残疾">视力残疾</checker-item>
        <checker-item value="听力残疾">听力残疾</checker-item>
        <checker-item value="言语残疾">言语残疾</checker-item>
        <checker-item value="肢体残疾">肢体残疾</checker-item>
        <checker-item value="智力残疾">智力残疾</checker-item>
        <checker-item value="精神残疾">精神残疾</checker-item>
         <checker-item value="其他残疾">其他残疾</checker-item>
      </checker>

      <x-button style='margin-top:20px;'
        type="primary"
        @click.native='setUserDetails'>提交</x-button>
    </group>
  </div>
</template>
<script>
import { mapState } from "vuex";
import lrz from "lrz"; //图片压缩插件

export default { 
  data() {
    return {
      disabilityNameList:[],//checker组件的v-model绑定值
      exposureNameList:[],//checker组件的v-model绑定值
      anaphylaxisNameList: [], //checker组件的v-model绑定值
      valueMap: [0, 1], //switch组件返回值true/false 换成0/1
      formModel: {
        AnaphylaxisName: "",
        CerebralApoplexy: 0,
        CerebralApoplexyDate: "",
        Diabetes: 0,
        DiabetesDate: "",
        DisabilityName: "",
        ExposureName: "",
        FamilyName: "",
        HeartDisease: 0,
        HeartDiseaseDate: "",
        HeredityName: "",
        Hypertension: 0,
        HypertensionDate: "",
        InfectiousDiseases: 0,
        InfectiousDiseasesDate: "",
        MalignantTumor: 0,
        MalignantTumorDate: "",
        MalignantTumorName: "",
        MentalIllness: 0,
        MentalIllnessDate: "",
        OccupationalDiseases: 0,
        OccupationalDiseasesDate: "",
        OccupationalDiseasesName: "",
        OperationName: "",
        OtherDiseases: 0,
        OtherDiseasesDate: "",
        OtherDiseasesName: "",
        PulmonaryDisease: 0,
        PulmonaryDiseaseDate: "",
        Tuberculosis: 0,
        TuberculosisDate: "",
        ID: "",

      }
    };
  },
  watch: {
    //checker组件的v-model绑定值一变化，对应formModel里的字段变化
    anaphylaxisNameList(arr) {
      this.formModel.AnaphylaxisName = arr.join(",");
    },
    exposureNameList(arr) {
      this.formModel.ExposureName = arr.join(",");
    },
    disabilityNameList(arr) {
      this.formModel.DisabilityName = arr.join(",");
    },
  },
  computed: {
    ...mapState(["dictionaries"])
  },
  methods: {
    //获取用户信息
    getUserDetails() {
      this.$vux.loading.show({text:'加载中'});
      this.$ajax({
        data: {
          header: {
            action: "GetUserInfo"
          },
          body: {
            userid: this.$common.getLocalStorage("user").userid
          }
        },
        success: res => {
          for (let attr in this.formModel) {
            this.formModel[attr] = res[attr];
          }
          this.anaphylaxisNameList = res.AnaphylaxisName.split(",");
          this.exposureNameList = res.ExposureName.split(",");
          this.disabilityNameList = res.DisabilityName.split(",");
        }
      });
    },
    test(a) {
      this.formModel.PermanentType = a[0];
    },
    //提交表单
    setUserDetails() {
      this.$vux.confirm.show({
        title: "提示",
        content: "确认提交信息？",
        onConfirm: () => {
          this.formModel.userId=this.formModel.ID;
          this.$vux.loading.show({text:'加载中'});
          this.$ajax({
            data: {
              header: {
                action: "EditUserMedicalInfo"
              },
              body: this.formModel
            },
            success: res => {
              this.$vux.toast.show({
                text: "修改成功",
                onHide: () => {
                  this.$router.go(-1);
                }
              });
            }
          });
        }
      });
    }
  },
  mounted() {
    this.getUserDetails();
  }
};
</script>

<style lang="less">
.medicalHistory {
  .details-content-box {
    background: #f1f1f1;
    margin: 10px 40px;
    margin-bottom: 40px;
    border-radius: 10px;
  }
  .weui-cell_switch {
    .weui-label {
      padding-left: 40px;
    }
    .weui-cell__ft {
      padding-right: 40px;
    }
  }

  .vux-datetime {
    font-size: 42px;
  }
}
</style>