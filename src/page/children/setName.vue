<template>
  <div class="set-box">
    <div class="input-box">
      <span>昵称</span>
      <input type="text" v-model="name" placeholder="请输入昵称">
    </div>

    <van-button class="login-btn" type="primary" size="large" color="#0c9c35" @click="setName">立即修改</van-button>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "setPhone",
    data(){
      return {
        name:this.$route.query.name,

      }
    },
    created() {
    },
    methods:{
    // 设置昵称
      setName() {
        this.$api.apiContent.setInfo({
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token,
          nick_name:this.name
        }).then(() => {
          Toast('修改成功');
          window.history.go(-1)
        }).catch(e => {
          console.log(e)
        })
      },
    }
  }
</script>

<style scoped lang="scss">
  .set-box{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
    overflow-y: scroll;
    p{
      line-height: 50px;
      text-align: center;
      span{
        color: #0c9c35;
      }
    }
    .input-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 51px;
      line-height: 50px;
      padding: 0 10px;
      background: #fff;
      border-bottom: 1px solid #f1f1f1;

      span {
        display: block;
        width: 80px;
      }

      input {
        flex: 1;
        display: block;
        height: 50px;
        padding: 0 10px 0 5px;
        color: #0c9c35;
      }

      a {
        color: #0c9c35;
      }
    }
    .login-btn {
      display: block;
      width: 80%;
      margin: 30px auto;
      height: 40px;
      line-height: 38px;
    }
  }
</style>