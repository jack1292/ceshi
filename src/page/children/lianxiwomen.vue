<template>
  <div class="set-box">
    <h3>韵之装</h3>
    <p>
      电话：15383227502<br/>
      邮箱：dzronge@126.com<br/>
      地址：河北省定州市华凡巴厘岛二区底商1-09商铺<br/>
    </p>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  export default {
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
    padding: 20px;

    h3{
      line-height: 150%;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 5px;
    }
    p{
      line-height: 150%;
      color: #666;
    }
  }
</style>