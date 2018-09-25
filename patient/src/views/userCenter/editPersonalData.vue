<template>
  <div class='view-user-edit-data common-padding'>
    <button-tab v-model="buttonTab"
      style='padding:10px;'>
      <button-tab-item>基本资料</button-tab-item>
      <button-tab-item>病史信息</button-tab-item>
    </button-tab>
    <group v-if='buttonTab==0'>
      <div class="img-box">
        <cell title="头像"
          is-link
          @click.native='file'
          class='userPicCell'> </cell>
        <input class='pic-input'
          @change='fileChange'
          type="file"
          ref='file'
          accept="image/*" />
        <span class='pic-img'><img class='userPic'
            :src="formModel.HeaderPhoto" /></span>
      </div>
      <x-input title="手机号码"
        disabled
        v-model='formModel.Mobile'
        placeholder="请输入手机号码"
        type="tel"
        placeholder-align='right'></x-input>
      <x-input title="姓名"
        disabled
        v-model='formModel.RealName'
        placeholder="请输入姓名"></x-input>
      <x-input title="身份证"
        disabled
        v-model='formModel.IDCard'
        placeholder="请输入身份证"
        type="tel"></x-input>
      <selector class='disabled'
        title="性别"
        readonly
        v-model='$common.sexType[formModel.Sex]'
        :options='sexSelect'></selector>

      <x-input title="社保/农合卡号"
        v-model='formModel.SocialSecurity'
        placeholder="请输入社保/农合卡号"></x-input>
      <x-input title="档案编号"
        v-model='formModel.FileNumber'
        placeholder="请输入档案编号"></x-input>
      <x-input title="纸质档案号"
        v-model='formModel.PaperNumber'
        placeholder="请输入纸质档案号"></x-input>
      <x-input title="户籍地址"
        v-model='formModel.PermanentAddressDoorNumber'
        placeholder="请输入户籍地址（门牌号）"></x-input>
      <x-input title="工作单位"
        v-model='formModel.WorkUnit'
        placeholder="请输入工作单位"></x-input>
      <popup-radio title="常住类型"
        :options="dictionaries.permanentType"
        v-model="formModel.PermanentType"></popup-radio>
      <popup-radio title="民族"
        v-model="formModel.Nation"
        :options="dictionaries.nation"></popup-radio>
      <popup-radio title="血型"
        v-model="formModel.BloodType"
        :options="dictionaries.bloodType"></popup-radio>
      <popup-radio title="RH"
        v-model="formModel.RH"
        :options="dictionaries.RH"></popup-radio>
      <popup-radio title="文化程度"
        v-model="formModel.Education"
        :options="dictionaries.education"></popup-radio>
      <popup-radio title="职业"
        v-model="formModel.Occupation"
        :options="dictionaries.occupation"></popup-radio>
      <popup-radio title="婚姻状态"
        v-model="formModel.MaritalStatus"
        :options="dictionaries.maritalStatus"></popup-radio>
      <x-address ref='addressSelect'
        title="二级省市"
        v-model="addressSelect"
        :list="addressData"
        placeholder="请选择城市"
        @on-shadow-change='addressSelectChange'></x-address>
      <x-input class='address'
        title="地址"
        v-model='formModel.Address'
        placeholder="请输入地址"></x-input>
      <!-- <x-textarea v-model='formModel.MedicalHistory'
        :max="200"
        name="description"
        placeholder="请输入个人病史"></x-textarea> -->
      <divider>医疗费用支付方式</divider>
      <checker v-model="paymentMethodCheckBox"
        type="checkbox"
        default-item-class="demo5-item"
        selected-item-class="demo5-item-selected">
        <checker-item value="城镇职工基本医疗保险">城镇职工基本医疗保险</checker-item>
        <checker-item value="城镇居民基本医疗保险">城镇居民基本医疗保险</checker-item>
        <checker-item value="新型农村合作医疗">新型农村合作医疗</checker-item>
        <checker-item value="贫困救助">贫困救助</checker-item>
        <checker-item value="商业医疗保险">商业医疗保险</checker-item>
        <checker-item value="全公费">全公费</checker-item>
        <checker-item value="全自费">全自费</checker-item>
        <checker-item value="其他">其他</checker-item>
      </checker>
      <x-button style='margin-top:20px;'
        type="primary"
        @click.native='setUserDetails'>提交</x-button>
    </group>
    <medicalHistory v-if='buttonTab==1'></medicalHistory>
  </div>
</template>
<script>
import { mapState } from "vuex";
import medicalHistory from "@/components/medicalHistory.vue";

import lrz from "lrz"; //图片压缩插件
export default {
  components: {    
    medicalHistory
  },
  data() {
    return {
      buttonTab: 0,
      paymentMethodCheckBox: [],
      addressSelect: [],
      sexSelect: [
        {
          key: "-1",
          value: "未知"
        },
        {
          key: "1",
          value: "男"
        },
        {
          key: "0",
          value: "女"
        }
      ],
      formModel: {
        AddTime: "",
        HeaderPhoto: "",
        Mobile: "",
        RealName: "",
        IDCard: "",
        Sex: "",
        CityName: "",
        CityID: "",
        FacePhoto: "",
        FacePhotoID: "",
        IsPatient: "",
        Photos: "",
        RealState: "",
        Remark: "",
        Address: "",
        MedicalHistory: "",
        CertPhotos: "",
        SocialSecurity: "",
        FileNumber: "",
        PaperNumber: "",
        PermanentAddressDoorNumber: "",
        ContactName: "",
        ContactPhone: "",
        WorkUnit: "",
        PermanentType: "",
        Nation: "",
        BloodType: "",
        RH: "",
        Education: "",
        Occupation: "",
        MaritalStatus: "",
        PermanentCityID: "",
        PermanentCityName: "",
        ID: ""
      },
      textareaShow: false
    };
  },
  watch: {
    paymentMethodCheckBox(arr) {
      this.formModel.PaymentMethod = arr.join(",");
    }
  },
  computed: {
    ...mapState(["dictionaries"]),
    //获取浏览器缓存LocalStorage里的城市json
    addressData() {
      return this.$common.getLocalStorage("cityList");
    }
    //处理数据返回的城市id
    // addressSelect() {
    //   let str = String(this.formModel.CityID).split("");
    //   return [
    //     str[0] + str[1] + "0000",
    //     str[0] + str[1] + str[2] + str[3] + "00",
    //     String(this.formModel.CityID)
    //   ];
    // }
  },
  methods: {
    addressSelectChange(data) {
      if (data.length > 0) {
        this.formModel.PermanentCityID = data[2].code;
        this.formModel.PermanentCityName = `${data[0].name}-${data[1].name}-${
          data[2].name
        }`;
      }
    },
    addressSelectHandle(opt) {
      let str = String(this.formModel[opt.cityIdKey]).split("");
      this[opt.listKey] = [
        str[0] + str[1] + "0000",
        str[0] + str[1] + str[2] + str[3] + "00",
        String(this.formModel[opt.cityIdKey])
      ];
    },
    //模拟点击上传控件
    file() {
      this.$refs.file.click();
    },
    //图片压缩并且转成base64字符串
    fileChange(e) {
      lrz(e.target.files[0], {
        width: 200,
        height: 200,
        quality: 0.3
      }).then(res => {
        this.formModel.HeaderPhoto = res.base64;
      });
    },
    //获取用户信息
    getUserDetails() {
      this.$vux.loading.show({
        text: "加载中"
      });
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
          this.addressSelectHandle({
            listKey: "addressSelect",
            cityIdKey: "CityID"
          });
          this.paymentMethodCheckBox = res.PaymentMethod.split(",");
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
          let obj = JSON.parse(JSON.stringify(this.formModel));
          obj.userid = obj.ID;
          obj.CityID = this.$refs.addressSelect.currentValue[2];
          if (obj.HeaderPhoto.indexOf("http") >= 0) {
            delete obj.HeaderPhoto;
          } else {
            obj.HeaderPhoto = obj.HeaderPhoto.split(",")[1];
          }
          this.$vux.loading.show({
            text: "加载中"
          });
          this.$ajax({
            data: {
              header: {
                action: "EditUserInfo"
              },
              body: obj
            },
            success: res => {
              localStorage.setItem("userPic", this.formModel.HeaderPhoto);
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
.view-user-edit-data {
  .img-box {
    position: relative;
  }
  .pic-input {
    top: 0px;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 3;
    left: 0px;
  }
  .pic-img {
    position: absolute;
    display: inline-block;
    width: 120px;
    height: 120px;
    overflow: hidden;
    border-radius: 100%;
    right: 80px;
    top: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .weui-cell_access {
    .vux-cell-value {
      margin-right: 30px;
      color: #000;
    }
  }

  .weui-cell {
    padding: 40px 40px;
    &.disabled {
      background: #f3f3f3;
    }
    label {
      width: 200px;
      font-size: 42px;
    }
    input {
      // height: auto;
      text-align: right;
      &[disabled] {
        -webkit-text-fill-color: #acacac;
      }
    }

    .weui-cell__ft {
      font-size: 42px;
    }
    &.medical-history {
      input[disabled] {
        -webkit-text-fill-color: #000;
        width: 85%;
        float: right;
      }
    }
    &.address {
      input {
        -webkit-text-fill-color: #000;
      }
    }
  }
  .weui-cell_select-after {
    padding: 40px 40px !important;
  }
  .vux-popup-picker-value {
    font-size: 42px;
    margin-right: 40px;
  }
  .vux-popup-dialog {
    background: #fff;
  }
  .vux-x-textarea {
    font-size: 42px;
  }
  .vux-checker-box {
    padding: 20px;
  }
}

.demo5-item {
  padding: 20px 40px;
  text-align: center;
  border-radius: 3px;
  border: 2px solid #ccc;
  background-color: #fff;
  margin-right: 6px;
  font-size: 42px;
  margin-top: 20px;
}
.demo5-item-selected {
  background: #01aeff no-repeat right bottom;
  border-color: #01aeff;
  color: #fff;
}
</style>