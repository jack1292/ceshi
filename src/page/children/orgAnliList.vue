<template>
  <div class="anli-list">
    <van-list
      v-if="!nodata"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="supermarket-list"
    >
      <a class="list-item" v-for="item in list" :key="item.id" :href="'/contents/orgAnliDetail?id=' + item.id" >
        <img :src="imgUrl + item.img" alt="">
        <h3 class="ovDna">{{item.title}} <span>(共{{item.num}}张)</span></h3>
      </a>
    </van-list>
    <div class="nodata" v-else>
      <div>
        <img src="../../assets/img/empty.svg" alt="">
        <p> 暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
  import config from "../../config";

  export default {
    name: "orgAnliList",
    data(){
      return {
        imgUrl: config.urlStr + '/',
        list: [],
        loading: false,
        finished: false,
        nodata: false,
      }
    },created() {
    },
    methods:{
      // 异步更新数据
      onLoad() {
        this.$api.apiContent.anli({
          id: this.$route.query.id,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token,
          limit: 100000,
          page: 1
        }).then(res => {
          this.list = res.data.list
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
        }).catch(() => {
          this.list = []
          // 加载状态结束
          this.loading = false;
          // 数据全部加载完成
          this.finished = true;
          this.nodata = true
        })
      },
    }
  }
</script>

<style scoped lang="scss">
.anli-list{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #f6f6f6;
  overflow-y: scroll;
  .supermarket-list {
    /*height: 100vh;*/
    padding: 20px;
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
      h3 {
        height: 40px;
        margin-top: 5px;
        line-height: 40px;
        padding: 0 10px;
        color: #333;

        span {
          font-size: 12px;
        }
      }
    }
  }
}
</style>