<template>
	<view class="comPhoto">
		<scroll-view class="left" scroll-y>
			<view v-for="(item,index) in phoList" :key="item.id" @click="addActive(index,item.id)" :class=" active === index ? 'active' : '' ">{{item.title}}</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view v-for="(item,index) in imgList" :key="item.id" class="item">
				<image :src="item.img_url" @click="previewImage(item.img_url)"></image>
				<view>{{item.title}}</view>
				<view>{{item.zhaiyao}}</view>
			</view>
			<view v-if="imgList.length === 0 ">暂无数据</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"comPhoto",
		data(){
			return{
				phoList:[],
				imgList:[],
				active:0
			}
		},
		onLoad(){
			this.getPhoCatgory();
		},
		methods:{
			async getPhoCatgory(){
				const res = await this.$myRequest({
					method:"GET",
					url:"/api/getimgcategory"
				});
				this.phoList = res.data.message;
				this.addActive(0,this.phoList[0].id);
			},
			async addActive(index,value){
				this.active = index;
				const res = await this.$myRequest({
					method:"GET",
					url:"/api/getimages/"+value
				});
				this.imgList = res.data.message;
				console.log(this.imgList);
			},
			previewImage(path) {
				const urls = this.imgList.map((item)=>{
					return item.img_url;
				});
				uni.previewImage({
					current: path,
					urls: urls,
					loop: true
				});
			},
		}
	}
</script>

<style lang="less">
	page{
		height:100%;
	}
	.comPhoto {
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
