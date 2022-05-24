<template>
	<view class="contact">
		<image src="https://img2.baidu.com/it/u=204260907,3510024908&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=375">
		</image>
		<view class="contactInfo">
			<view @click="makePhoneCall()">
				<text>联系电话：15279177122（点击拨打）</text>
			</view>
			<view>
				<text>地址：浙江省杭州市翻斗花园小区翻斗栋翻斗号翻斗楼</text>
			</view>
		</view>
		<map name="map" class="map" :scale="scale" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		name: "contact",
		data() {
			return {
				longitude: 116.268855,
				latitude: 28.414893,
				scale:15,
				markers: [
					{
						latitude: 28.414893,
						longitude: 116.268855,
						iconPath: '../../static/logo.png',
						width:"30px",
						height:"30px"
					},
					{
						latitude: 28.382695,
						longitude: 116.258101,
						iconPath: '../../static/logo.png',
						width:"30px",
						height:"30px"
					}
				]
			}
		},
		methods:{
			makePhoneCall(){
				uni.makePhoneCall({
					phoneNumber: '15279177122' //仅为示例
				});
			}
		}
	}
</script>

<style lang="less">
	.contact {
		width: 750rpx;

		image {
			width: 100%;
			height: 400rpx;
		}

		.contactInfo {
			font-size: 30rpx;
			padding: 10rpx 50rpx;

			view {
				border-bottom: 1px solid #f2f2f2;
				line-height: 80rpx;
			}
		}

		.map {
			width: 100%;
			height: 750rpx;
		}
	}
</style>
