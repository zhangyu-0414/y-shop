<template>
	<view class="studyVideo">
		<scroll-view class="left" scroll-y>
			<view>
				Web前端
			</view>
			<view>
				JAVA
			</view>
			<view>
				C
			</view>
			<view>
				C++
			</view>
			<view>
				PYTHON
			</view>
			<view>
				HASH
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view>暂无数据</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"studyVideo",
		data(){
			return{
				active:0
			}
		},
		onLoad(){
		},
		methods:{
			async addActive(index){
				this.active = index;
			}
		}
	}
</script>

<style lang="less">
	page{
		height:100%;
	}
	.studyVideo {
		display: flex;
		height:100%;
		.left {
			width:200rpx;
			height:100%;
			border-right:1px solid #eee;
			view{
				height:120rpx;
				line-height: 120rpx;
				text-align: center;
				border-bottom: 1px solid #f2f2f2;
			}
			.active{
				color:#fff;
				background-color:#FF4040;
				transform: scaleX(1.2);
			}
		}
		.right{
			width:500rpx;
			height:100%;
			margin:0 auto;
			image{
				width:500rpx;
				height:500rpx;
				border-radius: 5px;
			}
			view{
				margin:20rpx 0;
			}
		}
	}
</style>
