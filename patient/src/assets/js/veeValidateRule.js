export default {	
	noSpecial:{
		messages: {
			zh_CN: (field, args) => '不能使用特殊字符',
		},
		validate: (value, args) => { 
			return  /^\w+$/.test(value)
		}
	},
	isMobile: {
		messages: {
			zh_CN: (field, args) => '必须是11位手机号码',
		},
		validate: (value, args) => {
			return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
		}
	},
	isIdCard: {
		messages: {
			zh_CN: (field, args) => '必须是18位身份证号',
		},
		validate: (value, args) => {
			var json = {};
			var re = /^\d{17}(\d|X|x)$/;
			var idNum = value.toUpperCase();
			if(re.test(idNum)) {
				var weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //十七位数字本体码权重
				var validate = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; //mod11,对应校验码字符值
				var sum = 0;
				var mode = 0;
				var id17 = idNum.substring(0, 17);
				for(var i = 0; i < 17; i++) {
					sum = sum + parseInt(id17.substring(i, i + 1) * weight[i]);
				}
				mode = sum % 11;

				var c = idNum[17];
				json.success = (c == validate[mode]);
			} else {
				json.success = false;
			}
			if(json.success == false)
				json.errorMessage = '身份证格式错误';
			json.placeholder = '';
			return json.success;

//			return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
		}
	}
};