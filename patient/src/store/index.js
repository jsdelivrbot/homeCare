import Vue from 'vue' //vue框架
import Vuex from 'vuex' //vuex数据状态管理
Vue.use(Vuex)
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store({
  modules: {},
  state: {
    direction: 'forward',
    dictionaries: {
      warnDataType: [{
        value: '100',
        key: '体温',
        icon: 'thermometer',
        unit: '℃',
        color: 'temperature'
      }, {
        value: '200',
        key: '舒张压',
        icon: 'arrow-graph-up-left',
        unit: 'mmHg',
        color: 'diastolic-pressure',
      }, {
        value: '201',
        key: '收缩压',
        icon: 'arrow-graph-down-left',
        unit: 'mmHg',
        color: 'systolic-pressure',
      }, {
        value: '300',
        key: '血氧',
        icon: 'disc',
        unit: 'mmHg',
        color: 'oxygen',
      }, {
        value: '400',
        key: '心率',
        icon: 'network',
        unit: 'BMP',
        color: 'heart-rate',
      }, {
        value: '500',
        key: '空腹血糖',
        icon: 'flame',
        unit: 'mmol/L',
        color: 'fasting-blood-glucose',
      }, {
        value: '501',
        key: '餐后血糖',
        icon: 'waterdrop',
        unit: 'mmol/L',
        color: 'postprandial-blood-glucose',
      }],
      sex: [{
          value: '1',
          key: '男',
          color: 'blue'
        },
        {
          value: '0',
          key: '女',
          color: 'red'
        },
      ],
      eqiupBindState: [{
          value: '0',
          key: '绑定中',
          color: 'green'
        },
        {
          value: '1',
          key: '已解绑',
          color: 'red'
        },
      ],
      visitState: [{
        key: '未就诊',
        value: 0,
        color: 'default'
      }, {
        key: '已就诊',
        value: 1,
        color: 'green'
      }, {
        key: '过期',
        value: 2,
        color: 'red'
      }, {
        key: '已取消',
        value: 3,
        color: 'yellow'
      }],
      permanentType: [{
        key: '户籍',
        value: '户籍',
      }, {
        key: '非户籍',
        value: '非户籍',
      }],
      RH: [{
        key: '阴性',
        value: '阴性',
      }, {
        key: '阳性',
        value: '阳性',
      }, {
        key: '不详',
        value: '不详',
      }],
      maritalStatus: [{
        key: '未婚',
        value: '未婚',
      }, {
        key: '已婚',
        value: '已婚',
      }, {
        key: '离婚',
        value: '离婚',
      }, {
        key: '未说明的婚姻状况',
        value: '未说明的婚姻状况',
      }],
      education: [{
        key: '中等专业学校',
        value: '中等专业学校',
      }, {
        key: '大学专科和专科学校',
        value: '大学专科和专科学校',
      }, {
        key: '大学本科',
        value: '大学本科',
      }, {
        key: '研究生',
        value: '研究生',
      }, {
        key: '技工学校',
        value: '技工学校',
      }, {
        key: '高中',
        value: '高中',
      }, {
        key: '初中',
        value: '初中',
      }, {
        key: '小学',
        value: '小学',
      }, {
        key: '文盲或半文盲',
        value: '文盲或半文盲',
      }, {
        key: '不详',
        value: '不详',
      }, ],

      bloodType: [{
          key: 'O型',
          value: 'o型',
        }, {
          key: 'A型',
          value: 'a型',
        },
        {
          key: 'B型',
          value: 'b型',
        },
        {
          key: 'AB型',
          value: 'ab型',
        }, {
          key: '不详',
          value: '不详',
        }
      ],
      relationship: [{
        key: '本人',
        value: '本人'
      }, {
        key: '配偶',
        value: '配偶'
      }, {
        key: '儿子',
        value: '儿子'
      }, {
        key: '女儿',
        value: '女儿'
      }, {
        key: '父亲',
        value: '父亲'
      }, {
        key: '母亲',
        value: '母亲'
      }, {
        key: '公公',
        value: '公公'
      }, {
        key: '婆婆',
        value: '婆婆'
      }, {
        key: '岳父',
        value: '岳父'
      }, {
        key: '岳母',
        value: '岳母'
      }, {
        key: '继父',
        value: '继父'
      }, {
        key: '继母',
        value: '继母'
      }, {
        key: '祖父',
        value: '祖父'
      }, {
        key: '祖母',
        value: '祖母'
      }, {
        key: '外祖父',
        value: '外祖父'
      }, {
        key: '外祖母',
        value: '外祖母'
      }, {
        key: '兄',
        value: '兄'
      }, {
        key: '嫂',
        value: '嫂'
      }, {
        key: '弟',
        value: '弟'
      }, {
        key: '姐姐',
        value: '姐姐'
      }, {
        key: '妹妹',
        value: '妹妹'
      }, {
        key: '伯父',
        value: '伯父'
      }, {
        key: '伯母',
        value: '伯母'
      }, {
        key: '侄子',
        value: '侄子'
      }, {
        key: '侄女',
        value: '侄女'
      }, {
        key: '外甥',
        value: '外甥'
      }, {
        key: '外甥女',
        value: '外甥女'
      }, {
        key: '女婿',
        value: '女婿'
      }, {
        key: '养子',
        value: '养子'
      }, {
        key: '养女',
        value: '养女'
      }, {
        key: '儿媳',
        value: '儿媳'
      }, {
        key: '孙子',
        value: '孙子'
      }, {
        key: '孙女',
        value: '孙女'
      }, {
        key: '外孙子',
        value: '外孙子'
      }, {
        key: '外孙女',
        value: '外孙女'
      }, {
        key: '孙女婿',
        value: '孙女婿'
      }, {
        key: '孙媳妇',
        value: '孙媳妇'
      }],
      occupation: [{
        key: '无职业',
        value: '无职业'
      }, {
        key: '国家机关、党群组织、企业、事业单位负责人',
        value: '国家机关、党群组织、企业、事业单位负责人'
      }, {
        key: '专业技术人员',
        value: '专业技术人员'
      }, {
        key: '办事人员和有关人员',
        value: '办事人员和有关人员'
      }, {
        key: '商业、服务业人员',
        value: '商业、服务业人员'
      }, {
        key: '农、林、牧、渔、水利业生产人员',
        value: '农、林、牧、渔、水利业生产人员'
      }, {
        key: '生产、运输设备操作人员及有关人员',
        value: '生产、运输设备操作人员及有关人员'
      }, {
        key: '军人',
        value: '军人'
      }, {
        key: '不便分类的其他从业人员',
        value: '不便分类的其他从业人员'
      }],
      nation: [{
        key: '汉族',
        value: '汉族'
      }, {
        key: '蒙古族',
        value: '蒙古族'
      }, {
        key: '回族',
        value: '回族'
      }, {
        key: '藏族',
        value: '藏族'
      }, {
        key: '维吾尔族',
        value: '维吾尔族'
      }, {
        key: '苗族',
        value: '苗族'
      }, {
        key: '彝族',
        value: '彝族'
      }, {
        key: '壮族',
        value: '壮族'
      }, {
        key: '布依族',
        value: '布依族'
      }, {
        key: '朝鲜族',
        value: '朝鲜族'
      }, {
        key: '满族',
        value: '满族'
      }, {
        key: '侗族',
        value: '侗族'
      }, {
        key: '瑶族',
        value: '瑶族'
      }, {
        key: '白族',
        value: '白族'
      }, {
        key: '土家族',
        value: '土家族'
      }, {
        key: '哈尼族',
        value: '哈尼族'
      }, {
        key: '哈萨克族',
        value: '哈萨克族'
      }, {
        key: '傣族',
        value: '傣族'
      }, {
        key: '黎族',
        value: '黎族'
      }, {
        key: '傈傈族',
        value: '傈傈族'
      }, {
        key: '佤族',
        value: '佤族'
      }, {
        key: '畲族',
        value: '畲族'
      }, {
        key: '高山族',
        value: '高山族'
      }, {
        key: '拉祜族',
        value: '拉祜族'
      }, {
        key: '水族',
        value: '水族'
      }, {
        key: '东乡族',
        value: '东乡族'
      }, {
        key: '纳西族',
        value: '纳西族'
      }, {
        key: '景颇族',
        value: '景颇族'
      }, {
        key: '柯尔克孜族',
        value: '柯尔克孜族'
      }, {
        key: '土族',
        value: '土族'
      }, {
        key: '达斡尔族',
        value: '达斡尔族'
      }, {
        key: '仫佬族',
        value: '仫佬族'
      }, {
        key: '羌族',
        value: '羌族'
      }, {
        key: '布朗族',
        value: '布朗族'
      }, {
        key: '撒拉族',
        value: '撒拉族'
      }, {
        key: '毛难族',
        value: '毛难族'
      }, {
        key: '仡佬族',
        value: '仡佬族'
      }, {
        key: '锡伯族',
        value: '锡伯族'
      }, {
        key: '阿昌族',
        value: '阿昌族'
      }, {
        key: '普米族',
        value: '普米族'
      }, {
        key: '塔吉克族',
        value: '塔吉克族'
      }, {
        key: '怒族',
        value: '怒族'
      }, {
        key: '乌孜别克族',
        value: '乌孜别克族'
      }, {
        key: '俄罗斯族',
        value: '俄罗斯族'
      }, {
        key: '鄂温克族',
        value: '鄂温克族'
      }, {
        key: '德昂族',
        value: '德昂族'
      }, {
        key: '保安族',
        value: '保安族'
      }, {
        key: '裕固族',
        value: '裕固族'
      }, {
        key: '京族',
        value: '京族'
      }, {
        key: '塔塔尔族',
        value: '塔塔尔族'
      }, {
        key: '独龙族',
        value: '独龙族'
      }, {
        key: '鄂伦春族',
        value: '鄂伦春族'
      }, {
        key: '赫哲族',
        value: '赫哲族'
      }, {
        key: '门巴族',
        value: '门巴族'
      }, {
        key: '珞巴族',
        value: '珞巴族'
      }, {
        key: '基诺族',
        value: '基诺族'
      }],



    }
  },
  actions,
  getters: {
    //处理字典成键值对格式
    dictionaries(state) {
      let obj = {};
      for (let attr in state.dictionaries) {
        obj[attr] = {}
        state.dictionaries[attr].forEach((t) => {
          obj[attr][t.value] = t.key
        })
      }
      return obj
    }
  },
  mutations

});
export default store
