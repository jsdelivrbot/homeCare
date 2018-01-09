<template>
	<div class='view-face-recognition common-padding'>
		<!--<x-header class="header" :title='$route.name'></x-header>-->
		<div class="content">
			<div class="form">
				<div class="id-card clearfix">
					<div class="img">
						<div class='id-card-img' v-if='submitData.certPhotoFront'>
							<div class="demo-container">
								<img :src="submitData.certPhotoFront" id='img' />
							</div>
						</div>
						<input type="file" accept="image/*" capture="camera" @change='fileChange($event,{type:"certPhotoFront"})' />
						<div class="face-text">
							<img src="~assets/images/add-real-name.png" />
							<p>人脸照片</p>
						</div>
					</div>
				</div>
				<div class="msg">
					为增加审核通过率，请尽量保持照片清晰。
				</div>
				<x-button style='margin-top:20px ;' text='提交' @click.native='submitForm' :type="!hasFace?'default':'primary'" :disabled='!hasFace'></x-button>
			</div>
			<!--<div class="state-box">
				<div class="success" v-if='realState=="1"'>
					<div class="img"><img src="~assets/images/real-name-success.png" /></div>
					<p>您已通过实名认证!</p>
				</div>
				<div class="danger" v-if='realState=="2"'>
					<div class="img"><img src="~assets/images/real-name-danger.png" /></div>
					<p>您的认证失败，<br />请重新填写认证信息！</p>
					<x-button text='重新认证' type="primary"></x-button>
				</div>
				<div class="warn" v-if='realState=="0"'>
					<div class="img"><img src="~assets/images/real-name-warn.png" /></div>
					<p>认证信息已提交！<br />正在审核，请耐心等待...</p>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
	import { XButton, XHeader } from 'vux';
	import lrz from 'lrz' //图片压缩插件		
	export default {
		name: 'realName',
		data() {
			return {
				submitData: {
					realName: '',
					idCard: '',
					certPhotoFront: '',
					certPhotoBack: ''
				},
				hasFace:false//人脸识别
			}
		},
		computed: {
			realState() {
				return this.$common.getLocalStorage('realState')
			}
		},
		mounted() {

		},
		methods: {
			//图片压缩并且转成base64字符串
			fileChange(e, opt) {
				var d = document.querySelectorAll(".demo-container>.rect");
				for(var i = 0; i < d.length; i++) d[i].parentNode.removeChild(d[i]);
				lrz(e.target.files[0], {}).then((res) => {
					//					console.log(this.submitData[opt.type])
					this.submitData[opt.type] = res.base64;
				})
				setTimeout(() => {
					this.face();
				}, 500)
			},
			face() {
				var img = document.getElementById('img');
				var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
				tracker.setStepSize(1.7);
				tracking.track('#img', tracker);
				tracker.on('track', (event) =>{
					if(!event.data.length) {
						this.hasFace=false;
						this.$vux.toast.show({
									text: '画面中没有人脸',
									type: 'cancel'
								});
					}else{						
						event.data.forEach((rect)=> {
						window.plot(rect.x, rect.y, rect.width, rect.height);
						this.hasFace=true;
					});
					}
					
				});

				window.plot = function(x, y, w, h) {
					var rect = document.createElement('div');
					document.querySelector('.demo-container').appendChild(rect);
					rect.classList.add('rect');
					rect.style.width = w + 'px';
					rect.style.height = h + 'px';
					rect.style.left = (img.offsetLeft + x) + 'px';
					rect.style.top = (img.offsetTop + y) + 'px';
				};
			},
			//提交表单
			submitForm() {
				this.$vux.confirm.show({
					title: '提示',
					content: '确认提交？',
					onConfirm: () => {
						this.$common.ajax({
							data: {
								header: {
									action: 'facerecognition',
								},
								body: {
									idcard: this.$route.query.idCard,
									baseimg: this.submitData.certPhotoFront.split(',')[1]
								}
							},
							success: (res) => {
								this.$vux.toast.show({
									text: '提交成功',
									onHide: () => {
										this.$router.go(-1);
									}
								});
							}
						})
					}
				})
			}
		},
		components: {
			XButton,
			XHeader
		}
	}
</script>

<style lang="less">
	/*#img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -173px 0 0 -300px;
  }*/
	
	.view-face-recognition {
		.form {
			width: 92%;
			margin: 0 auto;
			margin-top: 40px;
			.title {
				text-align: center;
				font-size: 42px;
				margin-bottom: 40px;
			}
			input {
				width: 100%;
				height: 120px;
				background: #f3f1f4;
				border: 1px solid #d9d7da;
				font-size: 42px;
				text-indent: 1em;
				margin-bottom: 40px;
			}
			.id-card {
				margin-bottom: 20px;
				margin-top: 20px;
				.demo-container {
					width: 100%;
					height: 100%;
					.rect {
						border: 2px solid #a64ceb;
						left: -1000px;
						position: absolute;
						top: -1000px;
					}
				}
				.img {
					float: left;
					text-align: center;
					width: 100%;
					height: 600px;
					background: #f3f1f4;
					position: relative;
					border: 1px dashed #d8d8da;
					padding: 50px 0px;
					.id-card-img {
						overflow: hidden;
						position: absolute;
						left: 0;
						top: 0;
						z-index: 2;
						width: 100%;
						height: 100%;
						img {
							width: auto;
							height: 100%;
						}
					}
					p {
						font-size: 42px;
					}
					input {
						width: 100%;
						height: 100%;
						left: 0;
						top: 0;
						position: absolute;
						opacity: 0;
						z-index: 3;
					}
					&:first-child {
						margin-right: 2%;
					}
				}
				.face-text {
					position: absolute;
					left: 50%;
					top: 50%;
					margin-top: -13%;
					margin-left: -8%;
				}
			}
			.msg {
				margin-top: 60px;
				background: url(~assets/images/add-real-name-msg.png) no-repeat 55px;
				background-size: contain;
				padding-left: 70px;
				font-size: 42px;
				text-align: center;
			}
			button {
				border-radius: 15px;
				font-size: 52px;
			}
		}
		.state-box {
			text-align: center;
			margin-top: 120px;
			.img {
				width: 230px;
				height: 230px;
				margin: 0 auto;
				margin-bottom: 20px;
				img {
					width: 100%;
				}
			}
			p {
				font-size: 42px;
			}
			.success {}
			.danger {
				p {
					margin-bottom: 80px;
				}
				button {
					font-size: 42px;
					padding: 10px 0px;
					width: 90%;
					border-radius: 15px;
					margin: 0 auto;
				}
			}
		}
	}
</style>