<template>
	<view class="news">
		<view class="newList" v-for="(item,index) in newsList" :key="item.id"  @click="goDetail(item.id)">
			<image src="../../static/logo.png"></image>
			<view class="right">
				<view class="tit">
					{{item.title}}
				</view>
				<view class="info">
					<template v-if="item.add_time">
						<text>发表时间：{{item.add_time.slice(0,10)}}</text>
					</template>
					<text>浏览：{{item.click}}次</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:"news",
		data(){
			return{
				newsList:[]
			}
		},
		onLoad(){
			this.getNewsList();
		},
		methods:{
			async getNewsList(){
				const res = await this.$myRequest({
					method:"GET",
					url:"/api/getnewslist"
				});
				this.newsList = res.data.message;
			},
			goDetail(id){
				uni.navigateTo({
					url:"/pages/newsDetail/index?id="+id
				});
			}
		}
	}
</script>

<style lang="less">
	pages{
		width:100%;
		height:100%;
	}
	.news{
		width:100%;
		height:100%;
		.newList{
			display: flex;
			padding:15rpx 15rpx;
			border-bottom: 1px solid #FF4040;
			image{
				min-width: 200rpx;
				max-width: 200rpx;
				height:150rpx;
			}
			.right{
				padding:0 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.tit{
					font-size:33rpx;
				}
				.info{
					font-size:20rpx;
					text:nth-child(2){
						margin-left:50rpx;
					}
				}
			}
		}
	}
</style>
