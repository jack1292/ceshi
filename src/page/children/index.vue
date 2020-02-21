<template>
  <div class="index">
    <div class="index-swiper">
      <van-swipe :autoplay="6000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <a :href="image.link_url" class="seiper-items">
            <img v-lazy="imgUrl + image.focus_img"/>
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="index-text">
      <div class="desc-title">平台介绍</div>
      <div class="index-serve">特色服务</div>
      <div class="index-serve-list">
        <div>
          <img src="../../assets/img/service_cydia_1.png" alt="">
          <p>风格体验吧</p>
        </div>
        <div>
          <img src="../../assets/img/service_cydia_2.png" alt="">
          <p>公司筛选</p>
        </div>
        <div>
          <img src="../../assets/img/service_cydia_3.png" alt="">
          <p>多方案比选</p>
        </div>
        <div class="active">
          <img src="../../assets/img/service_cydia_4.png" alt="">
          <p>同方案价格比选</p>
        </div>
        <div class="active">
          <img src="../../assets/img/service_cydia_5.png" alt="">
          <p>可提供专业质检</p>
        </div>
      </div>
      <div class="index-serve">服务宗旨</div>
      <div class="index-desc-text">韵之装平台致力于为装修赋予和谐从容，轻松快乐的节奏感。减去寻找装修公司的缠累，把装修简单化。在这里，能更加省心、省力、省时，愉快的享受装修过程。</div>
      <div class="index-serve">服务内容</div>
      <div class="index-desc-text">通过互联网及集中管理，可以更加快捷查阅、了解整合后的装修公司信息，足不出户预约心仪的装修公司。通过平台组织的方案比选，保证方案的进度和质量，通过价格比选，对装修投资预算进行有效控制。平台备有专业监理工程师，可供客户委托对装修施工质量进行有效监督，进度进行有效控制。</div>
      <div class="index-serve">平台优势</div>
      <div class="index-desc-text">平台设置“体验吧”板块，选择之前，您可以在这里感受各式各样的装修风格，对自己装修意愿的把握更加准确。通过平台可以自主选择装修公司，解决电话泄露敏感问题，避免受到不必要的搅扰。并且我们提供贴心的线下服务，为您的需求量身打造装修招标文件，细心组织方案比选，请您保持悠然姿式，向装修出发！</div>
    </div>
    <div class="jiange"></div>
    <div class="index-text">
      <div class="desc-title">风采展示</div>
      <div class="index-img">
        <div v-for="(item,index) in descImg" :key="index" @click="onChange(index)">
          <img  :src="item" alt="" >
        </div>
      </div>
    </div>
    <van-image-preview v-model="show" :images="descImg" :startPosition="index">
    </van-image-preview>
    <img src="../../assets/img/float_call_phone.png" alt="" class="toPhone" @click="toPhone">
  </div>
</template>

<script>
  import config from '../../config/index'
  import { Dialog } from 'vant';
  export default {
    name: "index",
    data(){
      return {
        imgUrl:config.urlStr + '/',
        images:[],//  轮播
        descImg:[],
        show:false,
        index:0


      }
    },
    created() {
      this.$emit('tabBerSet', 2)
      this.getlistAdPhone()
      this.getFengcai()
    },
    methods:{
      toPhone(){
        Dialog.confirm({
          title: '咨询电话：',
          message: '15383227502',
          confirmButtonText:'立即拨打',
          confirmButtonColor:'#0c9c35'
        }).then(() => {
          window.location.href = 'tel://15383227502'
        }).catch(() => {
          // on cancel
        });
      },
      //  显示相册
      onChange(index){
        this.index = index
        this.show = true
      },
      //  风采展示
      getFengcai(){
        this.$api.apiContent.getFengcai().then(res=>{
          res.data.map(item=>{
            this.descImg.push(this.imgUrl + item.focus_img)
          })
        })
      },
      //  获取轮播
      getlistAdPhone(){
        this.$api.apiContent.listAdPhone().then(res=>{
          console.log(res)
          this.images = res.data
        })
      },
    }
  }
</script>

<style scoped lang="scss">
.index{
  .index-swiper {
    .seiper-items{
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      overflow: hidden;
      img {
        display: block;
        width: auto;
        height: 160px;
      }
    }

  }
  .index-text{
    padding: 0 10px 20px;
    .desc-title{
      width: 125px;
      height: 40px;
      line-height: 40px;
      margin: 5px auto;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      position: relative;
      &:before{
        position: absolute;
        top: 50%;
        left: -10px;
        content: '';
        width: 30px;
        height: 1px;
        background: #dedede;
      }
      &:after{
        position: absolute;
        top: 50%;
        right: -10px;
        content: '';
        width: 30px;
        height: 1px;
        background: #dedede;
      }
    }
    .index-serve{
      width:100%;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      background-color: #0c9c35;
    }
    .index-serve-list{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 10px;
      div{
        width: 32%;
        padding: 10px;
        margin:1% 0;
        border: 1px solid #e7ece8;
        &.active{
          width: 49%;
        }
        img{
          display: block;
          height: 30px;
          margin: 0 auto 10px;
        }
        p{
          text-align: center;
          color: #666666;
        }
      }
    }
    .index-desc-text{
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      line-height: 21px;
      color: #666666;
      border: solid 1px #e7ece8;
    }
  }
  .jiange{
    height: 10px;
    margin-bottom: 20px;
    background: #e2e2e2;
  }
  .index-img{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    div{
      width: 49%;
      height: 125px;
      margin-bottom: 2%;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .toPhone{
    position: fixed;
    right: 15px;
    bottom: 65px;
    width: 70px;
    height: 70px;
  }
}

</style>