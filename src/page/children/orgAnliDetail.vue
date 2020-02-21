<template>
  <div class="anli-detail">
    <div class="anli-item" v-for="(item,index) in list" :key="index">
      <div class="detail-title">
        <span>{{item.name}}</span>
      </div>
      <img :src="imgUrl + item.img" alt="">
    </div>
  </div>
</template>

<script>
  import config from "../../config";

  export default {
    name: "orgAnliList",
    data(){
      return {
        list:[],
        imgUrl: config.urlStr + '/',
      }
    },
    created() {
      this.getDetail()
    },
    methods:{
      getDetail(){
        this.$api.apiContent.anli_detail({
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token,
        }).then(res => {
          this.list = res.data.img_list
        }).catch()
      }
    }
  }
</script>

<style scoped lang="scss">
.anli-detail{
  padding: 20px;
  .anli-item{
    margin-bottom: 10px;
    .detail-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 40px;
      min-height: 40px;
      border-bottom: 1px solid #f7f7f7;

      span {
        padding-left: 10px;
        position: relative;
        font-size: 16px;
        color: #333;

        &:before {
          position: absolute;
          top: 10px;
          left: 0;
          content: '';
          width: 4px;
          height: 16px;
          background: #0c9c35;
          border-radius: 2px;
        }
      }
    }
    img{
      display: block;
      width: 100%;
      height: auto;
    }
  }
}
</style>