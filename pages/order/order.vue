<template>
	<view class="order">
		<button open-type="getUserInfo" @getuserinfo="getuserinfo">授权</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			getuserinfo(e) {
				console.log(e.detail);
				console.log(uni.login({
					  success (res) {
						  console.log(res.code);
					    if (res.code) {
					      //发起网络请求
					      wx.request({
					        url: 'https://test.com/onLogin',
					        data: {
					          code: res.code
					        }
					      })
					    } else {
					      console.log('登录失败！' + res.errMsg)
					    }
					  }
				}));
			}
		}
	}
</script>

<style scoped lang="scss">
.order{
	height: 100%;
	background-color: #eee;
}

</style>
