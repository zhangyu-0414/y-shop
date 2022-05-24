<template>
	<view class="newList" v-for="(item,index) in newsList" :key="item.id" @click="goDetail(item.id)">
		<image src="../static/logo.png"></image>
		<view class="right">
			<view class="tit">
				{{item.title}}
			</view>
			<view class="info">
				<text>发表时间：{{item.add_time.slice(0,10)}}</text>
				<text>浏览：{{item.click}}次</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "newsList",
		data() {
			return {

			};
		},
		props: ["newsList"],
		watch:{
			newsList(val){
				this.newsList = val;
			}
		}
	}
</script>

<style lang="less">
	.newList {
		display: flex;
		padding: 15rpx 15rpx;
		border-bottom: 1px solid #FF4040;

		image {
			min-width: 200rpx;
			max-width: 200rpx;
			height: 150rpx;
		}

		.right {
			padding: 0 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.tit {
				font-size: 33rpx;
			}

			.info {
				font-size: 20rpx;

				text:nth-child(2) {
					margin-left: 60rpx;
				}
			}
		}
	}
</style>
