import axios from 'axios';
export default {
	dateWeek: {
		1: '一',
		2: '二',
		3: '三',
		4: '四',
		5: '五',
		6: '六',
		7: '日',
	},
	sexType: {
		'-1': '未知',
		0: '女',
		1: '男'
	},
	warnDataType: {
		100: '体温',
		200: '舒张压',
		201: '收缩压',
		300: '血氧',
		400: '心率',
		500: '空腹血糖',
		501: '餐后血糖',
		1000: '脉率'
	},
	healthDataType: {
		//		100: '体温(手环)',
		101: '体温',
		//		102: '体温（皮肤贴）',
		200: '血压',
		300: '血氧',
		//		400: '心率(手环)',
		401: '心率',
		500: '空腹血糖',
		//		600: '睡眠',
		//		700: '步数',
		//		800: '热量',
		900: '心电图',
		1000: '脉率',
	},
	//清除缓存
	clearLocalStorage() {
		let arr = ['realState', 'token', 'user', 'userPic']
		arr.forEach((t) => {
			if(t) {
				localStorage.removeItem(t);
			}
		});
	},
	//url请求参数
	locationSearch() {
		var obj = {};
		location.search.split('?')[1].split('&').forEach((t) => {
			obj[t.split('=')[0]] = t.split('=')[1]
		})
		return obj;
	},
	//返回当天跟一周后的日期
	getWeek() {
		var date1 = new Date();
		var date2 = new Date(date1);
		date2.setDate(date1.getDate() + 7);
		return {
			startTime: date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(),
			endTime: date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate()
		}
	},
	ajax(opt) {
		var defaultOption = {
			loading: true, //是否显示加载
			loadingText: '加载中', //加载文字
			toast: true, //是否显示弹窗

		}
		for(var attr in opt) {
			defaultOption[attr] = opt[attr]
		}
		if(defaultOption.loading) {
			setTimeout(() => {
				homeCareApp.$vux.loading.show({
					text: defaultOption.loadingText
				});
			}, 0)
		}
		var payloadData = {
			"header": {
				"version": "1.0",
				"token": localStorage.getItem('token') || '',
				"action": defaultOption.data.header.action
			},
			"body": defaultOption.data.body
		}
		axios({
			timeout: 5000,
			method: defaultOption.method || 'post',
			url: defaultOption.url || 'http://api.homecare.sdsesxh.com', //'http://api.homecare.xuhui.com',
			data: payloadData
		}).then(response => {
			//判断是否有头像，没有就替换成默认值			
			if(Array.isArray(response.data.body)) {
				if(response.data.body[0] && 'HeaderPhoto' in response.data.body[0]) {
					response.data.body.forEach((t) => {
						if(t.HeaderPhoto == '') {
							t.HeaderPhoto = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA/AAD/4QN3aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXBSaWdodHM6TWFya2VkPSJGYWxzZSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1MgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMTE4QzFGMDcwREExMUU3QjU5MENGN0VBNzE3MTZBQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMTE4QzFGMTcwREExMUU3QjU5MENGN0VBNzE3MTZBQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjExMThDMUVFNzBEQTExRTdCNTkwQ0Y3RUE3MTcxNkFBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjExMThDMUVGNzBEQTExRTdCNTkwQ0Y3RUE3MTcxNkFBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAQEBgQEBggFBQUICgcGBgcKCwkJCgkJCw4LDAwMDAsODA0NDg0NDBEREhIRERkYGBgZHBwcHBwcHBwcHAEGBgYLCgsVDg4VFxMQExccHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBwc/8AAEQgBVgFWAwERAAIRAQMRAf/EAJQAAQACAwEBAAAAAAAAAAAAAAABAwIGBwUEAQEAAwEBAAAAAAAAAAAAAAAAAQQFAwIQAQABAwIDBAgDBgQGAwAAAAABAgMEEQUhMRJBURQGYXEiMpIT01WBQlKRobHBIxViclMk0YKyM3MH8GMlEQEAAQMEAgICAwEBAAAAAAAAARECA1Gh0RIhBDFBcTJhIkJSFP/aAAwDAQACEQMRAD8A39rsUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPSVDpKh0lQ6SodJUOkqHSVDpKh0lQ6SodJUOkqHSVDpA0KB0+koHSlJ0oog6SgdJUOkqHSVDpKh0lQ6SodJUOkqHSVDpKh0lQ6SodJUOkqHSVDpKh0lRAAAAAAEcwWAAAAAAAAAAAxBkCJmI5kC/HwM/LpmrFxrt+mPzW6Zqj9yJuiPl7i2Z+IfdY8rb9kTpTi1Uf+Sen+LxOa2Pt7jBfP0+ifJHmHTX5Nvh/9kPP/psev/Ne+O95c3yxOlWHcr/8cTX/AAh6jLbP28Thuj6fFfxsjEq6Mq1XYrnlTciaZ/e9xdE/DxNsx8q0vKAZAAAAAAAAAAAAAAArAAAAAAjmCwAAAAAAAAAAE2rVy9cptWaZuXK50popjWZn1EymIq2na/IeTeim7udz5NE87Nv3/R7XKPVorX+zEfC1Z6sz8tlwfLWzbdFNVvHiu5HD5lcdVU69/YrXZrrvtZtw22/T1KLduinpopiiO6mOlzq60ZoSASCu5atXP+5RTX66dUxKJiHiZvk7ZM2IqptTjVzOs1WZ4zM9+usaO1ue6HC717Zatunkvc8Cmq7YmMuzTxnp4V6f5eOqzZ7Fs/wrX+vdb/LwOUzE8JjhMO6ukQAAAAAAAAAAAAArAAAAAAjmCwAAAAAAAEAA9fYvLeXvdU3In5OLR716qOc91Pf6e5yy5Yt/Ltiwzf8Ahv8AtOyYG0Wot4luOvh13ao1qmfWo35Ju+WhjxRb8PQiOHfDm6J0iAAAAANNQNIBE0xpPDsB4m++WMDd7c3KYpx8mI0pvRHdyiYjsdseabXDLhi78ufbjtmZtWRONmUdFX5ao401R3xPav23xdFYZ99k2zSXyPTwkkSAAAAAAAAAACsAAAAACOYLAAAAAAAAQDYfK/lmd3q8Xma04dE+zH+pVHZ6nDNm6+I+VnBh7eZ+HQbOPbsURas0xRboiKaaYjSOChM1aERRZpOvOdO5CUgAAAAAAAiY46wBMTMaQD49x2nF3XFnGzI6onjTVHCaZ76Ze7L5tmsPF+OLopLmu9bNlbLlTYv+1aq/7V7TSK4j+cNHHki6GbkxzbPl58PcuSQAAAAAAAAAAVgAAAAARzBYAAAAAADEHq+Xdkq3rOi1VM049v2r1Uc9O6PTLnlydYdsWPvLp2PYtY1umzYpi3atxFNFNPLSGbM1acRRahIAAAAAAAAAAADz952q1u+HViX497jbuforjlMOmO/rNXPJji6KOX52Bk7blV4eXR0XaP2TE8pie2GjbdF0VhmXWzbNJUc3p4SAAAAAAAAACsAAAAACOYLAAAAAAAKKK666bdEdVVU6UxHOZklLqPl3aKNo263Y6Yi/VHVfq4T7c849TNy39pamHH1to9Sn0cnJ1SAAAAAAAAAAAABzBqvnfZfF4n9zs0x8/Fj+rPbVajn8PNa9bJSaKvs46xVoMcV2WeyAAAAAAAAABWAAAAABHMFgAAAAAANi8j7Z4zc6syuIqtYUROk/rq92Y9WkuHsX0tpqs+tZW6ujoekSz2inQAAAAAAAAAAAAAAGNdEVxNNcRNExMVRPKYnvETDk274Fe2blfw6+Py6pmmrTTWmeMTDVsu7REsrJZ1uo+R6cwAAAAAAAAFYAAAAAEcwWAAAAAgAHR/JeF4TZLd6Yia8nW7rHdPKFD2Lq3NL17aWtgpjSNFdYAAAAAAAAAAAAAAAY1ceHfOk+oGk/+wMKmm5i7hTE9VcTar7oinjT++V31bvmFH2rfiWoarVFNIAAAAAAAAKwAAAAAI5gsAAAABEkBTGtVNPfMR+8S7Bh49vFxrWNajSizRFFPqiGVdNZq17YpFF8cnl6AAAAAAAAAAAAAAARPvRHf2+oHh+csevI2G/FEa/Lmm7PqpnWXf15pc4exFbHNObRZrJCAAAAAAAAFYAAAAAEcwWAAAAAggfXtGP4rdMXH/1LsR/N5yTS2ZdLIrdEOuRGkRHcymsAAAAAAAAAAAAAAAAA8/zBEzsmdEc5sXP+mXTF+0OeX9JcnjhDUZTJCAAAAAAAAFYAAAAAEcwWAAAAAiSB6Hl6qmnfcGqqdIi/Tq8Zf1l1xftDq7LaoAAAAAAAAAAAAAAAAD4d+mKdlzZnlFiv/pl7xftDnl/WXJYajJZAAAAAAAAArAAAAAAjmCwAAAAESQLMe7NjItXo5266ao09ZMVh6iaS7FRPsx6oZDYSAAAAAAAAAAAAAAABM6A8vzNfos7FmdfDrtVW6f8ANVExDrhit0OWaaWS5XHJpstkhAAAAAAAACsAAAAACOYLAAAAAQQHd6OIOrbHmTm7Ri5NVXXcqtR8yY4+1EcY9bMyW0umGtiurbEvRhzdAAAAAAAAAAAAAAAETwqju46pGr+fcum1tdvEmJmvJuRVFXZHRxn+Kx61v9qqvtXf1o0Feqz0gAAAAAAAArAAAAAAjmCwAAAAAAG7eQM/qxb+3VTETZr+bbjtqir3v2aQp+zb5qverd4o3CO31qi4AAAAAAAAAAAAAAAxq96Ijn2+pKHOfOm4Rm7xVZt1TNrEpi3prrHXzmY/bC/69tLWd7N9bvw8F3VwAAAAAAAAFYAAAAAEcwWAAAAAAA+7Yty/tO6WcydeiJ6bun6Kubxls7W0dMV/W6rqlm9Rfs0XrdXVRciKqZjlMSzJiktWJrDONfXCEpAAAAAAAAAAAAAB8G9bna2jAuZlyY66Y0tUT+aueUPeOztNHPJf1irlFddVyuq5VPtVzNU/i1GVUEAAAAAAAAAKwAAAAAI5gsAAAAAABiDd/JO/0126dnyqv6lEf7eZ5TT+mPUp+xi/1C962X/MtvprieH7FVbZISAAAAAAAAAAAAwi5TxmYmNJ0nWP/nBNEVc583b5/ds75FiqZxcadKf8VfbUv4MfWP5Z3sZe0/w8F3V0gAAAAAAAAArAAAAAAjmCwAAAAAAAE27ldq5TdtVTRXRPVTVHOJgmKpiaOkeWPMNnebPRdmKM23TEXaP1afmp/mz82LrP8NLDl7R/L3XB3AAAAAAAAAAJmI58AAab5x8yfJ69pwKpi5VGmRdpnlT+iP5reDF9yp+xm/zDSoXJUUgAAAAAAAAAArAAAAAAjmCwAAAAAAAEECzGyb+JeoyMeubd2idaao4ImImHqJmJrDoXl/zXY3emnHv9NjNjSJpn3a/8npUcuDr5+mhizxd4+2wUzqrrCQAAAAAAAAYXemLdU16dMRrOs6Rp60wiWneY/OEUxXgbTVrVPs3cjsj/AA0f8VvFg+7lPN7H1a0yZmqZqqmapqnWZnjMytqYISAAAAAAAAAACsAAAAACOYLAAAAAAAAQBp2gU1VUVRXTVNFVM6xVE6TE+iYEt18seY98y66MfKsVZdmudPFxHTp6592dP2qebFbHmF3Dlun5ircaZ1jXl3aqi4kAAAAAAFV+7VZtV3KKJu1UUzNNFOmtUx2JiKomaOdeYfMW8Ztc42RRVg2J5WdJpmqOyZmef4NDFitjzHlnZc10+J8PBdnBPAqhAMgAAAAAAAAAAVgAAAAARzBYAAAAAADEE66FB6e1+Xd03bSvHt9FnWP6tzhExPbT+rT0Od+W211sw3XfDctp8mbbt8Rcyo8ZkU6T1Ve7Ex+mP+Kpf7Ez8LuP17Y+fL36bcUU9FGlNPoiI/g4Vd6M4jRCQAAAAAAGM0RVVFU8dOQKcnCxcu1NnLt036a+E9URrp64eoumPh5utiflqm8eRKKprv7RV0dvh6+Xqpns/FZs9n/pVyer/wAtTztvzNtvTYzbU2qtdImfdq07aavzLVt0XRWFS6ybZpL5tXqjwAyAAAAAAAAABWAAAAABHMFgAAAAAIBnYsXsm7TYx6Ju3K/dopjWSZo9REz8N22HyTax+nK3aIu3Y4xY50092s9swpZfYr4hdxetTzc2uiiimnSmNI7IjgrVWohMa6aRHTECWSAAAAAAAAAAn9gMZjWrjHLtBRmYGHn2psZdqLtuv8tUdvr7Hq26Y+Hm62Lvlom/eTsrbtcnBicnG/NTEe3T+HbC9izxd4lQy+vNvmPhrna7qxqCQAAAAAAAAVgAAAAARzBYAAAACOwgfVtu2Ze65NONiUdUz79f5aY75l5vvi2Ky92WTdNIdG2Ty9g7Ja/pxFeRPv36o4zr2R6Gfkyzf+GjjxRZ+Xrw5OwAAAAAAAAAAAAAACKu3XTSeHEGp+ZPJ1rJprztqpi3fjjXZjhTX3zHpWsWeniVTN69fNrRq6K7dc27lM0V0TpVTVwmJjsmF2FGgIAAAAAAAAVgAAAAARzBYAAACAfZtO1ZO8ZlOJjRp23Lkxwop75eL74tisullk3TSHS9r2rC2jHjFxKOnXhcuae3XV+qWfffN01lpWWRbFIehpGmjm6AAAAAAAAAAAAAAAAAIqiNOru48Aa55m8sWd1tVZWHTFGdRHVMxwi7H6Z9KxhzdfE/Ctmwxd5j5c9rortV1W7lM0V0TNNVM8JiY719no7CUJAAAAAABWAAAAABHMFgAAMSg+jBwsnccqjExaeu5cn8IjtmfRDzddERWXq22bppDp+zbPY2bEpxbHtdty5+aqqeev8AJnZL5umrUx44tikPvqp15cJnhM9rm6UZAAAAAAAAAAAAAAAAAAiqJmOE6THECKdI9PPh3g1bzd5bnOtTuWHT/u7UR10Ux79Mer8yzgy08T8KvsYa+Y+WhcYnSeExwleUAQkAAAAAFYAAAAAEcwWAAAimmquqKKYmqqqdKaY4zMyJdH8qbBRtWJTkXqf97fp1rq/TE/lZ+fL2mn00cGLrFft78ceOmjgsJAAAAAAAAAAAAAAAAAAAABHbpp6dQaD5y8vRhXf7nhUaWL0/1qKY9yr9Xqle9fLXxKh7GKk1hq6yqJAAAAABWAAAAABHMFgAANo8k7HGXendcmmJsWZ6bUT219s/8qt7GSniFv1sVZrLfaddOKivpAAAAAAAAAAAAAAAAAAAAAABTlY1rKs149+mK7V2OmaZ5JiaeYeborFJcs3ra7m0bhcw7nGPft1R20Vcmnjv7RVl5LOs0fE9uYAAAACsAAAAACOYLAQD6Nvwb+45lrDx41ru1aa84iO2Z9DzddERWXuy2bppDq+HiWcLGtYlmNKLMRFMR6GZddWatW22Iij6Hl6AAAAAAAAAAAAAAAAAAAAAAARVETGgPA837RO57bN6xT1ZGL7dHDWemPeiPXDvgv6z5+1f2Mfa38Occe3g0GakAAAAFYAAAAAEcwWAgG7eQ9o6LVzdr0aTdibdnsmKfzT+PBT9m/6XvVx/6bjx4/uVFwiNIAAAAAAAAAAAAAAAAAAAAAAABExx1gCYjt5ag5f5o2qdq3W5RRGli/8A1LM9kRPONe+JaWG/tay81nW55Tq4gAAAKwAAAAAI5gyBbj2LmVkW8a1HVXeqiimPTKJmkPURWaOtYeNawsWziWfcx6YtU6zx0iGXdNZq1rbaRR9Ly9AAAAAAAAAAAAAAAAAAAAAAAAAIrmYpmY/eDXPO+3xl7TORRE/Mwp+ZGnLoq97X8IWPXupd+Vb2ba210c8X2ckAAAFYAAAAAEcwZEDZvIm3+K3K5mVUxVRiU+zr/qVe7MfslX9m6kUWvVsrdXR0CaY7tZierT0qNV9khIAAAAAAAAAAAAAAAAAAAAAAAACK41jTTWJ4SDC7ZtX7ddq5TFdFyOiumeU0piaImKuSbjiV4Offw7mnVZrmOHLTnH7pats1irJvtpMw+fsTLwkAAFYAAAAAEcwZkDo/kvA8Jstu7XERXlT83WOc0z7uvqZ/sXVuaXrW0t/LYIiIjTucFgAAAAAAAAAAAAAAAAAAAAAAAAAA5gTEA5/59wJsbjazqYiLeTT0zpzmujnM/hML/rXVijP9qyl1WsQsSqpAABWAAAAABHMFtu3Vdu0WqI6qq6opimO3WSvhMOv4li3jY9rHtxpRaoimmPREMm6azVr2xSKLkPQAAAAAAAAAAAAAAAAAAAAAAAAAAADW/POJF/ZfnRTNVeNXTVTp2RVOlU/sWPWmlyt7VtbXO45L8s5kAACsAAAAACOYPY8rWK8jfsSKI1i1X82v/LTHH+Llmmlku2CK3w6jERyjsZrUSAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4t4x68na8vHtcblyzXRTE98xwe8c0uiXjJFbZhyXSYmaZ4TTMxP4cGoyUiAAFYAAAAAEcwbT5Bs1VbvcvxHs27VVEz6apiY/gr+zP9aLXqx/aroMclBoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAImf3QDj+dZqx82/Zr4VUXKon8Z1/m1rZrDHuikqkvIACsAAAAACOYN2/9dR7OfP8AitaT8Sp7X0u+p9tzj+KmupAAAAAAAAAAAAAAAAAAAAAAAAAAAABE68ezWOAOWeZtf7/na9t2f4Q08X6wys37y810cgAFYAAAAAEc+YN28i5NdnDyKbWLdyapuRNdVqbURHdE/MuUSp+zFZjyu+tNInw2aM/M4f8A5uT6faxvrK/WNY34Wu86Ttynx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06Ttyjx+Zw127J7dfaxvrHWNY34R2nSduXPPNVz5u936/l1WKp067dzpmqJ/5Kqo/ev4Y/qz88/2l5Dq4gAMQAf/2Q=='
						}
					})
				}
			} else {
				if(response.data.body && response.data.body.HeaderPhoto == '') {
					response.data.body.HeaderPhoto = 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA/AAD/4QN3aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXBSaWdodHM6TWFya2VkPSJGYWxzZSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1MgV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxMTE4QzFGMDcwREExMUU3QjU5MENGN0VBNzE3MTZBQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxMTE4QzFGMTcwREExMUU3QjU5MENGN0VBNzE3MTZBQSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjExMThDMUVFNzBEQTExRTdCNTkwQ0Y3RUE3MTcxNkFBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjExMThDMUVGNzBEQTExRTdCNTkwQ0Y3RUE3MTcxNkFBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpS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dnDyKbWLdyapuRNdVqbURHdE/MuUSp+zFZjyu+tNInw2aM/M4f8A5uT6faxvrK/WNY34Wu86Ttynx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06TtyePy/tuV8WN9c6xrG/B2nSduTx+X9tyvixvrnWNY34O06Ttyjx+Zw127J7dfaxvrHWNY34R2nSduXPPNVz5u936/l1WKp067dzpmqJ/5Kqo/ev4Y/qz88/2l5Dq4gAMQAf/2Q=='

				}
			}

			if(defaultOption.loading) {
				setTimeout(() => {
					homeCareApp.$vux.loading.hide();
				}, 0)
			}
			let statusMethod = {
				'0' () {
					if(response.data.body && response.data.body.result || defaultOption.result) {
						defaultOption.success(response.data.body, response.data.header);
					} else {
						if(defaultOption.toast) {
							setTimeout(() => {
								if(defaultOption.error) {
									defaultOption.error(response.data.body);
								} else {
									homeCareApp.$vux.toast.show({
										text: response.data.body.cause,
										type: 'cancel'
									})

								}
							}, 0)
						}
					}
				},
				'3' () {
					statusMethod['4']();
				},
				'4' () {
					setTimeout(() => {
						let text;
						if(response.data.header.desc != '') {
							text = response.data.header.desc
						} else {
							text = response.data.header.failures.message
						}
						if(defaultOption.error) {
							defaultOption.error(response.data.body);
						}
						if(!defaultOption.noMessage) {
							homeCareApp.$vux.toast.show({
								text: text,
								type: 'warn',
							});
						}

					}, 0)
				},
				'5' () {
					statusMethod['4']();
					setTimeout(() => {
						homeCareApp.$common.clearLocalStorage();
						homeCareApp.$router.push({
							path: 'login'
						});
					}, 2000)
				},
				//token过期
				'6' () {
					//					statusMethod['4']();
					setTimeout(() => {
						homeCareApp.$common.login({})
					}, 0)

				},
				'7' () {
					statusMethod['4']();
				}
			}
			statusMethod[response.data.header.status]();
		}).catch(response => {
			if(response.code == "ECONNABORTED") {
				homeCareApp.$vux.loading.hide();
				homeCareApp.$vux.toast.show({
					text: '请求超时',
					type: 'cancel',
				});

				return false;
			}
			console.error(response.message)
		});

	},
	//全局通用登录
	login(opt) {
		setTimeout(() => {
			let data = {
				mobile: opt.tel || '',
				pwd: opt.password || '',
				clientinfo: '12',
				ValidateCode: opt.ValidateCode || ''
			}
			if(localStorage.openId != 'undefined') {
				data.openId = localStorage.openId
			}
			homeCareApp.$common.ajax({
				loading: opt.loading,
				noMessage: opt.noMessage || false,
				data: {
					header: {
						action: opt.action || 'UserLogin',
					},
					body: data
				},
				success: (res) => {
					homeCareApp.$common.setLocalStorage('token', res.tokenid);
					homeCareApp.$common.setLocalStorage('userPic', res.HeaderPhoto);
					homeCareApp.$common.setLocalStorage('user', res);
					opt.render && opt.render();
				},
				error: () => {
					setTimeout(() => {
						homeCareApp.$common.clearLocalStorage();
						homeCareApp.$router.push('/login')
					}, 0)
				}
			})
		}, 0)

	},
	getLocalStorage(key) {
		if(localStorage.getItem(key) != 'undefined') {
			return JSON.parse(localStorage.getItem(key));
		}

	},
	setLocalStorage(key, value) {
		if(typeof value == 'object') {
			value = JSON.stringify(value)
		}
		localStorage.setItem(key, value)
	}
};