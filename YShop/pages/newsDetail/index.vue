<template>
	<view class="newsDetail">
		<text class="tit">
			{{newsDetail.title}}
		</text>
		<view class="info">
			<template v-if="newsDetail.add_time">
				<text>
					发表时间：{{newsDetail.add_time.slice(0,10)}}
				</text>
			</template>
			<text>
				浏览：{{newsDetail.click}}
			</text>
		</view>
		<view class="content">
			<rich-text :nodes="newsDetail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"newsDetail",
		data(){
			return{
				newsDetail:{}
			}
		},
		onLoad(options){
			this.getNewsDetail(options.id)
		},
		methods:{
			async getNewsDetail(id){
				const res = await this.$myRequest({
					method:"GET",
					url:"/api/getnew/"+id,
				});
				this.newsDetail = res.data.message[0];
			}
		}
	}
</script>

<style lang="less">
	.newsDetail{
		padding: 10rpx 20rpx;
		.tit{
			font-size:40rpx;
		}
		.info{
			margin:20rpx 0;
			display: flex;
			justify-content: space-between;
		}
		.content{
			font-size:35rpx;
		}
	}
</style>
