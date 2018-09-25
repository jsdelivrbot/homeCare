<template>
	<div class='view-feedback'>
		<div class="state-box"
		    v-if='state'>
			<div class="success">
				<div class="img">
					<img src="~assets/images/real-name-success.png" />
				</div>
				<p>
					提交成功<br />
					<span>非常感谢您的宝贵意见！</span>
				</p>
			</div>
		</div>
		<template v-else>
			<p class='message'>欢迎您提供宝贵的意见和建议，我们将不断为您改进。</p>
			<div class="group">
				<div class="title">反馈类型</div>
				<ul class="clearfix">
					<li v-for='(t,i) in type.list'
					    :class='{active:i+1==type.active}'
					    @click='toggleClass(t)'>{{t.value}}</li>
				</ul>
			</div>
			<div class="group">
				<div class="title">反馈内容</div>
				<group class="form">
					<x-textarea name='content'
					    placeholder='请输入反馈，我们将不断为您改进'
					    v-model="content"
					    :max='300'
					    autosize
					    v-validate="'required'"
					    :class="{'is-danger': validateError.has('content')}"></x-textarea>
					<x-input name="tel"
					    type='text'
					    placeholder="请输入手机号码（选填）"
					    v-model='tel'>
					</x-input>
					<x-button text='提交'
					    :type="validateError.any()?'default':'primary'"
					    :disabled='validateError.any()'
					    @click.native='submitData'></x-button>
				</group>
			</div>
		</template>
	</div>
</template>
<script>
export default {
  data() {
    return {
      type: {
        active: "0",
        list: [
          {
            value: "程序漏洞",
            key: 1
          },
          {
            value: "使用问题",
            key: 2
          },
          {
            value: "新功能需求",
            key: 3
          },
          {
            value: "性能问题",
            key: 4
          },
          {
            value: "其他",
            key: 5
          }
        ]
      },
      state: false, //提交状态
      content: "",
      tel: ""
    };
  },
  methods: {
    toggleClass(obj) {
      this.type.active = obj.key;
    },
    //提交表单
    submitData() {
      this.$vux.loading.show({
        text: "加载中"
      });
      this.$ajax({
        data: {
          header: {
            action: "AddFeedback"
          },
          body: {
            Platform: 31,
            type: this.type.active,
            Content: this.content,
            doctorid: 0,
            userid: this.$common.getLocalStorage("user").userid,
            Mobile: this.tel
          }
        },
        success: res => {
          this.state = true;
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
      });
    }
  },
  mounted() {
    this.$validator.validateAll();
  },

  components: {
   
  }
};
</script>

<style lang="less">
.view-feedback {
  padding-top: 110px;
  height: 94.3%;
  background: #fff;
  .message {
    margin-top: 50px;
    margin-bottom: 70px;
    font-size: 42px;
    text-align: center;
  }
  .group {
    width: 90%;
    margin: 0 auto;
    margin-bottom: 40px;
    .title {
      font-size: 42px;
      border-bottom: 1px solid #d3d3d3;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    ul {
      li {
        display: inline-block;
        width: 230px;
        border: 1px solid #dfdfdf;
        padding: 20px;
        text-align: center;
        margin-bottom: 20px;
        font-size: 42px;
        margin-right: 40px;
        &:last-child {
          margin-right: 0;
        }
        &.active {
          border-color: @primary-color;
          background: url(~assets/images/feedback.png) no-repeat right top;
          background-size: 25%;
        }
      }
    }
  }
  .form {
    .weui-cells,
    .weui-cell {
      &:after,
      &:before {
        border: none;
      }
    }
    .vux-x-textarea {
      border-radius: 15px;
      background: #f3f1f4;
      border: 1px solid #d9d7da;
      textarea {
        font-size: 42px;
        background: #f3f1f4;
      }
    }
    .vux-x-input {
      border: 1px solid #d9d7da;
      margin-top: 30px;
      background: #f3f1f4;
      margin-bottom: 60px;
    }
    button {
      padding: 10px 0px;
      border-radius: 15px;
    }
  }
  .state-box {
    margin-top: 80px;
    .success {
      .img {
        width: 230px;
        height: 230px;
        margin: 0 auto;
        margin-bottom: 30px;
        img {
          width: 100%;
        }
      }
      p {
        text-align: center;
        font-size: 42px;
        span {
          color: #ec6700;
        }
      }
    }
  }
}
</style>