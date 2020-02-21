<template>
  <div class="box">
    <div class="sheji-box" v-if="detail">
      <img :src="imgUrl + detail.pic" alt="">
      <h3>
        {{detail.name}}
        <span>{{detail.touxian}}</span>
      </h3>
      <p>{{detail.year}}年经验 {{detail.anli}}套案例</p>
    </div>
    <div class="jiange"></div>
    <div class="detail-tabs">
      <span :class="tabs === 1?'active':''" @click="tabs = 1">设计作品（{{list.length}})</span>
      <span :class="tabs === 2?'active':''" @click="tabs = 2">个人介绍</span>
    </div>
    <div class="shieji-detail-desc" v-if="tabs===1">
      <div  v-if="!nodata">
        <div class="list-item" v-for="(item,index) in list" :key="item.id"  @click="showImg(index)">
          <img :src="imgUrl + item.img" alt="">
          <h2 class="ovDna">{{item.name}} <span>({{item.desc}})</span></h2>
          <p>{{item.desc}}</p>
        </div>
      </div>

      <div class="nodata" v-else>
        <div>
          <img src="../../assets/img/empty.svg" alt="">
          <p> 暂无数据</p>
        </div>
      </div>
    </div>
    <div class="shieji-detail-desc" v-if="tabs===2 && detail">
      <h3 v-if="detail.desc">个人简介</h3>
      <div v-if="detail.desc" class="shiji-detail2">{{detail.desc}}</div>
      <h3 v-if="detail.linian">设计理念</h3>
      <div v-if="detail.linian" class="shiji-detail2">{{detail.linian}}</div>
      <h3 v-if="detail.rongyu">荣誉奖项</h3>
      <div v-if="detail.rongyu" class="shiji-detail2">{{detail.rongyu}}</div>
    </div>
    <van-image-preview v-model="show" :images="descImg" :startPosition="index">
    </van-image-preview>
  </div>
</template>

<script>
  import config from "../../config";

  export default {
    name: "orgSheji",
    data(){
      return {
        imgUrl: config.urlStr + '/',
        detail:null,
        tabs:1,
        list:[],
        nodata:false,
        show:false,
        index:0,
        descImg:[],
      }
    },
    created() {
      this.getDetail()
      this.getAnli()
    },
    methods:{
      showImg(index){
        console.log(index)
        this.descImg = []
        this.list[index].img_list.map(item=>{
          this.descImg.push(this.imgUrl + item)
        })
        this.show=true
      },
      getAnli(){
        this.$api.apiContent.sheji_anli({
          page:1,
          limit:10000,
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          this.list = res.data.list
          this.nodata = false
        }).catch(() => {
          this.list = []
          this.nodata = true
        })
      },
      getDetail(){
        this.$api.apiContent.sheji_detial({
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          this.detail = res.data
        }).catch(() => {

        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .box {
    .sheji-box {
      padding: 20px;
      img{
        display: block;
        width: 60px;
        height: 60px;
        border-radius:60px ;
        margin: 20px auto;
      }
      h3{
        text-align: center;
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 5px;
        span{
          height: 20px;
          background-image: linear-gradient(141deg, #a68b60 0%, #bea371 51%, #caae79 75%);
          border-top-left-radius: 17px;
          border-top-right-radius: 15px;
          border-bottom-right-radius: 15px;
          padding-left: 12px;
          padding-right: 9px;
          padding-bottom: 3px;
          padding-top: 3px;
          color: #fff;
          font-size: 12px;

        }
      }
      p{
        margin-top: 10px;
        text-align: center;
        color: #999;
        font-size: 12px;
      }
    }
    .jiange{
      height: 10px;
      background: #f7f7f7;
    }
    .detail-tabs{
      display: flex;
      align-items: center;
      justify-content: space-between;
      span{
        display: block;
        width: 50%;
        height: 38px;
        text-align: center;
        line-height: 38px;
        border-bottom: 1px solid #f7f7f7;
        &.active{
          color: #0c9c35;
        }
      }
    }
    .shieji-detail-desc{
      padding: 20px;
      h3{
        font-size: 16px;
        margin-bottom: 10px;
      }
      .shiji-detail2{
        line-height: 150%;
        margin-bottom: 20px;
        font-size: 13px;
        color: #666;
      }
      .list-item {
        display: block;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 20px;
        background: #fff;
        img{
          display: block;
          width: 100%;
          height: 200px;
        }
        h2 {
          height: 30px;
          margin-top: 5px;
          line-height: 30px;
          color: #333;

          span {
            font-size: 12px;
          }
        }
        p{
          color: #999;
          line-height: 150%;
          font-size: 12px;
        }
      }
    }
  }
</style>