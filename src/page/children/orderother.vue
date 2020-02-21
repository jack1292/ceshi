<template>
  <div class="order-from">
    <div class="from-box">
      <div class="from-item">
        <span class="item-albel">装修预算</span>
        <div class="item1-box">
          <div><input type="number" v-model="num1">万</div>
          <span>-</span>
          <div><input type="number" v-model="num2">万</div>
        </div>
      </div>
      <div class="from-item">
        <span class="item-albel">房屋面积</span>
        <div class="item1-box">
          <div style="width: 100%;"><input type="number" v-model="num3" placeholder="请输入您的房屋面积">m2</div>
        </div>
      </div>
      <div class="from-item">
        <span class="item-albel">房屋户型</span>
        <div class="item1-box">
          <div style="width: 100%;"><input type="text" :value="num4" readonly @click="show=!show" placeholder="请输入您的房屋户型"></div>
        </div>
      </div>
      <div class="from-item">
        <span class="item-albel">房屋地址</span>
        <div class="item1-box">
          <div style="width: 100%;"><input type="text" v-model="num5" placeholder="请输入您的房屋地址"></div>
        </div>
      </div>
      <div class="from-item" style="align-items: flex-start">
        <span class="item-albel">其它补充</span>
        <div class="item1-box">
          <div style="width: 100%; padding: 0;height: auto;">
            <textarea placeholder="请输入您的房屋地址" v-model="num6"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="submit-btn" @click="submitOrder">提交</div>
    <van-popup
        v-model="show"
        position="center"
      >
        <p style="line-height: 50px;border-bottom: 1px solid #e2e2e2;text-align: center;">请选择您的户型</p>
        <div class="other-chiose">
          <div>
            <span :class="chiose1 === '0室'?'active':''" @click="chiose1 = '0室' ">0室</span>
            <span :class="chiose1 === '1室'?'active':''" @click="chiose1 = '1室' ">1室</span>
            <span :class="chiose1 === '2室'?'active':''" @click="chiose1 = '2室' ">2室</span>
            <span :class="chiose1 === '3室'?'active':''" @click="chiose1 = '3室' ">3室</span>
            <span :class="chiose1 === '4室'?'active':''" @click="chiose1 = '4室' ">4室</span>
            <span :class="chiose1 === '5室'?'active':''" @click="chiose1 = '5室' ">5室</span>
            <span :class="chiose1 === '6室'?'active':''" @click="chiose1 = '6室' ">6室</span>
          </div>
          <div>
            <span :class="chiose2 === '0厅'?'active':''" @click="chiose2 = '0厅' ">0厅</span>
            <span :class="chiose2 === '1厅'?'active':''" @click="chiose2 = '1厅' ">1厅</span>
            <span :class="chiose2 === '2厅'?'active':''" @click="chiose2 = '2厅' ">2厅</span>
            <span :class="chiose2 === '3厅'?'active':''" @click="chiose2 = '3厅' ">3厅</span>
            <span :class="chiose2 === '4厅'?'active':''" @click="chiose2 = '4厅' ">4厅</span>
            <span :class="chiose2 === '5厅'?'active':''" @click="chiose2 = '5厅' ">5厅</span>
            <span :class="chiose2 === '6厅'?'active':''" @click="chiose2 = '6厅' ">6厅</span>
          </div>
          <div>
            <span :class="chiose3 === '0卫'?'active':''" @click="chiose3 = '0卫' ">0卫</span>
            <span :class="chiose3 === '1卫'?'active':''" @click="chiose3 = '1卫' ">1卫</span>
            <span :class="chiose3 === '2卫'?'active':''" @click="chiose3 = '2卫' ">2卫</span>
            <span :class="chiose3 === '3卫'?'active':''" @click="chiose3 = '3卫' ">3卫</span>
            <span :class="chiose3 === '4卫'?'active':''" @click="chiose3 = '4卫' ">4卫</span>
            <span :class="chiose3 === '5卫'?'active':''" @click="chiose3 = '5卫' ">5卫</span>
            <span :class="chiose3 === '6卫'?'active':''" @click="chiose3 = '6卫' ">6卫</span>
          </div>
          <div>
            <span :class="chiose4 === '0阳台'?'active':''" @click="chiose4 = '0阳台' ">0阳台</span>
            <span :class="chiose4 === '1阳台'?'active':''" @click="chiose4 = '1阳台' ">1阳台</span>
            <span :class="chiose4 === '2阳台'?'active':''" @click="chiose4 = '2阳台' ">2阳台</span>
            <span :class="chiose4 === '3阳台'?'active':''" @click="chiose4 = '3阳台' ">3阳台</span>
            <span :class="chiose4 === '4阳台'?'active':''" @click="chiose4 = '4阳台' ">4阳台</span>
            <span :class="chiose4 === '5阳台'?'active':''" @click="chiose4 = '5阳台' ">5阳台</span>
            <span :class="chiose4 === '6阳台'?'active':''" @click="chiose4 = '6阳台' ">6阳台</span>
          </div>
        </div>
        <div class="submit-btn" style="background: #FF6B64" @click="setBig">确定</div>
      </van-popup>
  </div>
</template>

<script>
  export default {
    name: "orderother",
    data(){
      return {
        num1:'',
        num2:'',
        num3:'',
        num4:'',
        num5:'',
        num6:'',
        show:false,
        chiose1:'0室',
        chiose2:'0厅',
        chiose3:'0卫',
        chiose4:'0阳台',
      }
    },
    methods:{
      setBig(){
        this.num4  = this.chiose1 + this.chiose2 + this.chiose3 + this.chiose4
        this.show = false
      },
      submitOrder(){
        this.$api.apiContent.addOrder({
          address: this.num5,
          area: this.num3,
          budget_max: this.num2,
          budget_min: this.num1,
          house_type: this.num4,
          id: this.$route.query.id,
          message:this.num6,
          pay_type: 1,
          terminal: 3,
          sign: this.$store.state.user.sgin,
          timestamp: parseInt(new Date().getTime() / 1000),
          token: this.$store.state.user.token
        }).then(res=>{
          console.log(res)
        }).catch(e=>{
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.order-from{
  height: 100vh;
  background: #f6f6f6;

  .from-box{
    background: #Fff;
    padding: 20px 10px;
    .from-item{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .item-albel{
        display: block;
        width: 70px;
        line-height: 40px;
      }
      .item1-box{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        div{
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 40%;
          height: 40px;
          line-height: 40px;
          border: 1px solid #e2e2e2;
          padding: 0 10px;
          input{
            display: block;
            width: 70%;
            height: 38px;
          }
          textarea{
            display: block;
            width: 100%;
            height: 100px;
            padding: 10px;
            resize:none;
          }
        }
      }
    }
  }
  .submit-btn{
    width: 80%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin: 30px auto;
    background: #0c9c35;
    color: #fff;
    font-size: 16px;
  }
   .other-chiose{
     display: flex;
     align-items: center;
     justify-content: space-between;
     width: 80vw;
     padding: 20px;
     div{
       width: 20%;
       span{
         display: block;
         width: 100%;
         height: 40px;
         text-align: center;
         line-height: 40px;
         background: #e2e2e2;
         margin-bottom: 10px;
         &.active{
           background: #FF6B64;
           color: #fff;
         }
       }
     }
   }
}
</style>