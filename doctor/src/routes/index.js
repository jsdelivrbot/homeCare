import login from 'components/login';
import loginCode from 'components/loginCode';
import register from 'components/register';
import findPassword from 'components/findPassword';
import noPage from 'components/404.vue';
import message from 'components/message.vue';
//----------------------------------------------------------------
import homeRouterView from 'views/home/routerView.vue';
import home from 'views/home/index';
import newsDetails from 'views/home/news/details.vue';
import trackView from 'views/home/trackView/index.vue';
import healthData from 'views/home/healthData/index.vue';
import healthRule from 'views/home/healthRule/index.vue';
import contractDoctor from 'views/home/contractDoctor/index';
import contractDoctorDetails from 'views/home/contractDoctor/details.vue';
import contractDoctorEveluate from 'views/home/contractDoctor/evaluate.vue';
import contractDoctorAppointment from 'views/home/contractDoctor/doctorAppointment.vue';
import appointment from 'views/home/appointment/index.vue';
import appointmentDetails from 'views/home/appointment/details.vue';
import hospital from 'views/home/hospital/index.vue';
import hospitalDepartment from 'views/home/hospital/department.vue';
import healthInterventionProgram from 'views/home/healthInterventionProgram/index.vue';
import healthInterventionProgramDetails from 'views/home/healthInterventionProgram/details.vue';
import healthInterventionProgramAdd from 'views/home/healthInterventionProgram/add.vue';
import familyMember from 'views/home/familyMember/index.vue';
import familyMemberDetails from 'views/home/familyMember/details.vue';
import familyMemberSearch from 'views/home/familyMember/search.vue';

//-----------------------------------------------------------------
import userCenterRouterView from 'views/userCenter/routerView.vue';
import userCenter from 'views/userCenter/index.vue';
import realName from 'views/userCenter/realName.vue';
import editPersonalData from 'views/userCenter/editPersonalData';
import editPassword from 'views/userCenter/editPassword';
import visit from 'views/userCenter/visit/index';
import visitDetails from 'views/userCenter/visit/details.vue';
import feedback from 'views/userCenter/feedback';

const routes = [{
		path: '/login',
		name: "用户登录",
		component: login,
		meta: {
			noRequiresAuth: true
		}
	},
	{
		path: '/loginCode',
		name: "验证码登录",
		component: loginCode,
		meta: {
			noRequiresAuth: true
		}
	},
	{
		path: '/register',
		name: "用户注册",
		component: register,
		meta: {
			noRequiresAuth: true
		}
	},
	{
		path: '/findPassword',
		name: "找回密码",
		component: findPassword,
		meta: {
			noRequiresAuth: true
		}
	},
	{
		path: '/404',
		name: "开发中",
		component: noPage,
		meta: {
			noRequiresAuth: true
		}
	},
	{
		path: '/message',
		name: "通知",
		component: message,
		meta: {
			noRequiresAuth: true,
			messageLink: true
		}
	},
	{
		path: '/homeRouterView',
		name: "首页路由",
		component: homeRouterView,
		children: [{
				path: 'home',
				name: "居家护理",
				component: home
			}, {
				path: 'newsDetails',
				name: "资讯详情",
				component: newsDetails
			}, {
				path: 'trackView',
				name: "轨迹查看",
				component: trackView

			}, {
				path: 'healthData',
				name: "健康数据",
				component: healthData,

			}, {
				path: 'healthRule',
				name: "健康规则",
				component: healthRule,

			}, {
				path: 'contractDoctor',
				name: "科室医生",
				component: contractDoctor,

			},
			{
				path: 'contractDoctorDetails',
				name: "医生详情",
				component: contractDoctorDetails,

			},
			{
				path: 'contractDoctorEveluate',
				name: "医生评价列表",
				component: contractDoctorEveluate,

			},
			{
				path: 'contractDoctorAppointment',
				name: "预约挂号",
				component: contractDoctorAppointment,

			}, {
				path: 'appointment',
				name: "预约管理",
				component: appointment,

			},{
				path: 'appointmentDetails',
				name: "预约管理详情",
				component: appointmentDetails,

			}, {
				path: 'hospital',
				name: "合作医院",
				component: hospital,

			},
			{
				path: 'hospitalDepartment',
				name: "通讯录",
				component: hospitalDepartment,

			}, {
				path: 'healthInterventionProgram',
				name: "健康建议计划",
				component: healthInterventionProgram,

			},
			{
				path: 'healthInterventionProgramDetails',
				name: "健康建议计划详情",
				component: healthInterventionProgramDetails,

			},
			{
				path: 'healthInterventionProgramAdd',
				name: "添加健康建议",
				component: healthInterventionProgramAdd,

			}, {
				path: 'familyMember',
				name: "签约患者",
				component: familyMember
			},
			{
				path: 'familyMemberDetails',
				name: "签约患者详情",
				component: familyMemberDetails
			},
			{
				path: 'familyMemberSearch',
				name: "家庭成员搜索",
				component: familyMemberSearch
			}
		]
	}, {
		path: '/userCenterRouterView',
		name: "个人中心",
		component: userCenterRouterView,
		children: [{
				path: 'userCenter',
				name: '我的',
				component: userCenter
			},
			{
				path: 'realName',
				name: "实名认证",
				component: realName
			},
			{
				path: 'editPersonalData',
				name: "修改个人资料",
				component: editPersonalData
			},
			{
				path: 'editPassword',
				name: "修改密码",
				component: editPassword
			},
			{
				path: 'visit',
				name: "就诊记录",
				component: visit
			},
			{
				path: 'visitDetails',
				name: "就诊记录详情",
				component: visitDetails
			},
			{
				path: 'feedback',
				name: "意见反馈",
				component: feedback
			}

		]
	},
	{
		path: '*',
		redirect: '/homeRouterView/home'
	}
]
export default routes