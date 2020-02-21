<template>
  <div class="fg-box">
    <van-tabs v-model="active" swipeable v-if="list.length>0">
      <van-tab v-for="(item,index) in list" :key="index" :title= "item.name">
        <div class="fg-desc">
          <div class="detail-text" v-html="item.content"></div>
          <div class="detail-img">
            <img v-for="(cell,j) in item.img_list" :key="j" :src="imgUrl + cell" alt="">
          </div>
        </div>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import config from "../../config";

  export default {
    name: "fgDetail",
    data(){
      return{
        id:this.$route.query.id,
        imgUrl:config.urlStr + '/',
        active:0,
        list:[]
      }
    },
    created() {
      this.getDetail()
    },
    methods:{
      getDetail(){
        this.$api.apiContent.fgDetail({
          id:this.id
        }).then(res=>{
          this.list = res.data.son
        }).catch()
      }
    }
  }
</script>

<style scoped lang="scss">
  .fg-desc{
    padding: 20px;
    border: 1px solid #e2e2e2;
  }
  .detail-text{
    line-height: 150%;
  }
  .detail-img{
    img{
      display: block;
      width: 100%;
      margin-bottom: 20px;
    }
  }
</style>