<template>
  <div class="fenge-box">
    <div class="fenge-list">
      <span :class="chiose[0] === 0?'active':''" @click="setChiose(0)">全部</span>
      <span :class="chiose.indexOf(1) !== -1?'active':''" @click="setChiose(1)">欧式</span>
      <span :class="chiose.indexOf(2) !== -1?'active':''" @click="setChiose(2)">田园</span>
      <span :class="chiose.indexOf(3) !== -1?'active':''" @click="setChiose(3)">中式</span>
      <span :class="chiose.indexOf(4) !== -1?'active':''" @click="setChiose(4)">新古典 </span>
      <div @click="show=!show">
        <img src="../../assets/img/caidan.png" alt="">
      </div>
    </div>
    <div class="list">
      <div class="list-item" v-for="(item,index) in list" :key="index" @click="toDetail(item.id,item.title)">
        <div>
          <img :src="imgUrl + item.img" alt="">
          <p class="ovDna">{{item.title}}</p>
        </div>
      </div>
    </div>
    <div class="fengge-prop">
      <van-popup
        v-model="show"
        position="top"
        :style="{top:'50px'}"
      >
        <div class="other-chiose">
          <span :class="chiose.indexOf(5) !== -1?'active':''" @click="setChiose(5)">现代简约</span>
          <span :class="chiose.indexOf(6) !== -1?'active':''" @click="setChiose(6)">混搭</span>
          <span :class="chiose.indexOf(7) !== -1?'active':''" @click="setChiose(7)">loft</span>
          <span :class="chiose.indexOf(8) !== -1?'active':''" @click="setChiose(8)">工业</span>
          <span :class="chiose.indexOf(9) !== -1?'active':''" @click="setChiose(9)">后现代</span>
          <span :class="chiose.indexOf(10) !== -1?'active':''" @click="setChiose(10)">地中海</span>
          <span :class="chiose.indexOf(11) !== -1?'active':''" @click="setChiose(11)" style="display: none">经典</span>
          <span :class="chiose.indexOf(12) !== -1?'active':''" @click="setChiose(12)">复古</span>
          <span :class="chiose.indexOf(13) !== -1?'active':''" @click="setChiose(13)" style="display: none">巴洛克</span>
          <span :class="chiose.indexOf(14) !== -1?'active':''" @click="setChiose(14)" style="display: none">洛可可</span>
          <span :class="chiose.indexOf(15) !== -1?'active':''" @click="setChiose(15)">美式</span>
          <span :class="chiose.indexOf(16) !== -1?'active':''" @click="setChiose(16)">法式</span>
          <span :class="chiose.indexOf(17) !== -1?'active':''" @click="setChiose(17)">日式</span>
          <span :class="chiose.indexOf(18) !== -1?'active':''" @click="setChiose(18)">轻奢</span>
          <span :class="chiose.indexOf(19) !== -1?'active':''" @click="setChiose(19)">东南亚</span>
        </div>
      </van-popup>
    </div>

  </div>
</template>

<script>
  // import { List } from 'vant';
  import config from "../../config";

  export default {
    name: "fenge",
    data() {
      return {
        imgUrl:config.urlStr + '/',
        list: [],
        chiose:[0],
        tips:'加载中',
        show:false
      };
    },
    created() {
      this.$emit('tabBerSet', 1)
      this.init()
    },
    methods: {
      toDetail(id,name){
        this.$router.push({
          path:'/contents/fgDetail',
          query:{
            id:id,
            title:name
          }
        })
      },
      setChiose(num){
        if(num === 0){
          this.chiose = [0]
        }else{
          if(this.chiose.indexOf(0)!==-1){
            this.chiose.splice(this.chiose.indexOf(0),1)
          }
          let index =  this.chiose.indexOf(num)
          if(index === -1){
            this.chiose.push(num)
          }else{
            this.chiose.splice(index,1)
            if(this.chiose.length === 0){
              this.chiose = [0]
            }
          }
        }
        this.init()
      },
      init() {
        // 异步更新数据
        this.$api.apiContent.FengeList({
          page: 1,
          limit: 2000,
          type: this.chiose.join(',')
        }).then(res=>{
          this.list = res.data.list
          // 加载状态结束
          this.list.length === 0?this.tips = '暂无数据':this.tips="已加载全部"
        }).catch(e=>{
          console.log(e)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .fenge-box {
    height: 100%;
    background: #f1f1f1;
    .fenge-list {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 50px;
      line-height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e2e2e2;
      background: #fff;
      z-index: 9;

      span {
        display: block;
        width: 20%;
        text-align: center;
        &.active{
          color: #0c9c35;
        }
      }
      div{
        display: block;
        width: 20%;
        img {
          display: block;
          width: 24px;
          margin: 0 auto;
        }
      }

    }
    .list{
      position: absolute;
      top: 50px;
      left: 0;
      right: 0;
      bottom: 60px;
      background: #f1f1f1;
      overflow-y: scroll;
      /*display: flex;*/
      /*align-items: center;*/
      /*flex-wrap: wrap;*/
      padding: 10px;
      .list-item{
        float: left;
        width: 50%;
        padding: 6px;
        div{
          width: 100%;
          margin: 0 auto;
          background: #fff;
          border: 1px solid #f1f1f1;
          img{
            display: block;
            width: 100%;
            height: 105px;
          }
          p{
            line-height: 30px;
            text-align: center;
          }
        }
      }
    }
  }
.other-chiose{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  flex-wrap: wrap;
  span{
    display: block;
    width: 93px;
    height: 30px;
    line-height: 30px;
    background: #e2e2e2;
    text-align: center;
    margin: 10px;
    &.active{
      background: #0c9c35;
      color: #fff;
    }
  }
}
</style>