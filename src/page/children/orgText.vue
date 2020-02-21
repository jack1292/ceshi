<template>
  <div class="org-text-box">
    <div class="org-text" v-html="content"></div>
    <div class="jiange"></div>
    <div class="detail-title">
      <span>公司证书</span>
    </div>
    <div class="anli-box">
      <div v-for="(item,index) in zizhi" :key="index">
        <img :src="item" alt="" @click="onChange(index)">
      </div>
    </div>
    <div class="jiange"></div>
    <div class="detail-title">
      <span>服务特色</span>
    </div>
    <div class="tese-list">
      <span v-if="tsfw.indexOf(1)!==-1"><img src="../../assets/img/icon_orange_select.svg" alt="">免费量房</span>
      <span v-if="tsfw.indexOf(2)!==-1"><img src="../../assets/img/icon_orange_select.svg" alt="">免费验房</span>
      <span v-if="tsfw.indexOf(3)!==-1"><img src="../../assets/img/icon_orange_select.svg" alt="">负责设计</span>
      <span v-if="tsfw.indexOf(4)!==-1"><img src="../../assets/img/icon_orange_select.svg" alt="">精准布局</span>
      <span v-if="tsfw.indexOf(5)!==-1"><img src="../../assets/img/icon_orange_select.svg" alt="">金牌工长绿色施工</span>
      <span v-if="tsfw.indexOf(6)!==-1"><img src="../../assets/img/icon_orange_select.svg" alt="">资深监理巡检工地</span>
      <span v-if="tsfw.indexOf(7)!==-1"><img src="../../assets/img/icon_orange_select.svg" alt="">分项验收</span>
      <span v-if="tsfw.indexOf(8)!==-1"><img src="../../assets/img/icon_orange_select.svg" alt="">终身质保</span>
      <span v-if="tsfw.indexOf(9)!==-1"><img src="../../assets/img/icon_orange_select.svg" alt="">不定期电话回访</span>
    </div>
    <van-image-preview v-model="show" :images="zizhi" :startPosition="index">
    </van-image-preview>
  </div>
</template>

<script>
  import config from "../../config";

  export default {
    name: "orgText",
    data() {
      return {
        imgUrl: config.urlStr + '/',
        images: [],//  轮播
        anli: '',
        browse: '',
        content: '',
        designer: '',
        id: '',
        is_cart: 0,
        logo: '',
        name: '',
        order_num: '',
        server: 0,
        sheji: 0,
        shigong: 0,
        style: [],
        tsfw: [],
        zizhi: [],
        anliList: [],
        shijiList: [],
        shigongList: [
          {wa: 0, mu: 0, you: 0, dian: 0, shui: 0, level: 0},
          {wa: 0, mu: 0, you: 0, dian: 0, shui: 0, level: 0},
          {wa: 0, mu: 0, you: 0, dian: 0, shui: 0, level: 0},
          {level: 0, shui: 0, dian: 0, you: 0, mu: 0, wa:0}
        ],
        pingjiaList:[],
        show:false,
        index:0
      }
    },
    created() {
      this.getDetail()
    },
    methods:{
      //  显示相册
      onChange(index){
        this.index = index
        this.show = true
      },
      //  获取公司详情
      getDetail() {
        this.$api.apiContent.orgDetail({
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res => {
          this.images = res.data.img_list
          this.anli = res.data.anli
          this.browse = res.data.browse
          this.content = res.data.content
          this.designer = res.data.designer
          this.id = res.data.id
          this.is_cart = res.data.is_cart
          this.logo = res.data.logo
          this.name = res.data.name
          this.order_num = res.data.order_num
          this.server = res.data.server
          this.sheji = res.data.sheji
          this.shigong = res.data.shigong
          this.style = res.data.style ? res.data.style : []
          // this.tsfw = res.data.tsfw
          // this.zizhi = res.data.zizhi ? res.data.zizhi : []
          res.data.zizhi.map(item=>{
            this.zizhi.push(this.imgUrl + item)
          })
          res.data.tsfw.map(item=>{
            this.tsfw.push(Number(item))
          })
        })
      },
    }
  }
</script>

<style scoped lang="scss">
.org-text-box{
  padding: 10px;
  .jiange {
    height: 10px;
    background: #f7f7f7;
  }

  .detail-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
    border-bottom: 1px solid #f7f7f7;

    span {
      padding-left: 10px;
      position: relative;
      font-size: 16px;
      color: #666;

      &:before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 4px;
        height: 16px;
        background: #0c9c35;
        border-radius: 2px;
      }
    }

    a {
      color: #666;
    }
  }
  .anli-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-bottom: 10px;

    div {
      width: 50%;
      padding: 5px;

      img {
        display: block;
        width: 100%;
        height: 140px;
        border-radius: 5px;
      }
    }

  }
  .tese-list{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 10px;
    background: #fff;
    span{
      display: block;
      margin: 0 15px 15px 0;
      img{
        position: relative;
        top: -2px;
        width: 16px;
        margin-right: 5px;
      }
    }
  }
}
</style>