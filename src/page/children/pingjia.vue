<template>
  <div class="set-box">
    <div class="pingjia-box">
      <h2 class="name">{{name}}</h2>
      <p>期待你的五星好评哟!</p>
      <div class="pingjia-item">
        <span>设计评价:</span>
        <van-rate v-model="sheji" size="24" color="#FF6B64"/>
      </div>
      <div class="pingjia-item">
        <span>服务评价:</span>
        <van-rate v-model="server" size="24" color="#FF6B64"/>
      </div>
      <div class="pingjia-item">
        <span>施工评价:</span>
        <van-rate v-model="shigong" size="24" color="#FF6B64"/>
      </div>
    </div>
    <van-button class="login-btn" type="primary" size="large" color="#0c9c35" @click="pingjia">确定</van-button>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "pingjia",
    data(){
      return {
        name: this.$route.query.name,
        sheji: Number(this.$route.query.sheji),
        server: Number(this.$route.query.server),
        shigong: Number(this.$route.query.shigong),
      }
    },
    methods:{

      pingjia(){
        this.$api.apiContent.pingjia({
          id: this.$route.query.id,
          server: this.server,
          sheji: this.sheji,
          shigong: this.shigong,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(()=>{
          Toast('评价成功');
          window.history.go(-1);
        }).catch(e=>{
          Toast(e.msg);
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .set-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
    overflow-y: scroll;
    .pingjia-box{
      background: #fff;
      padding: 50px 0 20px;
      margin-bottom: 30px;
      .name{
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      p{
        text-align: center;
        color: #999;
        font-size: 12px;
        margin-bottom: 20px;
      }
      .pingjia-item{
        text-align: center;
        height: 50px;
        line-height: 50px;
        span{
          display: inline-block;
          line-height: 50px;
          position: relative;
          top: -3px;
          padding: 0 10px;
          font-size: 16px;
        }
      }
    }
    .login-btn {
      display: block;
      width: 80%;
      margin: 0 auto;
      height: 40px;
      line-height: 38px;
    }
  }
</style>